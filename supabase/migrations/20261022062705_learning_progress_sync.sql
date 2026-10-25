create table public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  constraint learning_progress_object check (jsonb_typeof(progress) = 'object'),
  constraint learning_progress_size check (octet_length(progress::text) <= 2000000)
);
alter table public.learning_progress enable row level security;
revoke all on public.learning_progress from anon, authenticated;
grant select, insert, update on public.learning_progress to authenticated;
create policy "Read own learning progress" on public.learning_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own learning progress" on public.learning_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own learning progress" on public.learning_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Require MFA when enrolled" on public.learning_progress as restrictive to authenticated
  using ((select private.has_sufficient_aal())) with check ((select private.has_sufficient_aal()));

-- One owner row lock serialises device merges; each timestamped field merges independently.
create function public.merge_learning_progress(incoming jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  owner_id uuid := auth.uid(); merged jsonb; topic text; item jsonb; previous jsonb;
  checked_item jsonb; practice jsonb; review_time text; practice_time text; stored_time text;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if incoming is null or jsonb_typeof(incoming) <> 'object' or octet_length(incoming::text) > 2000000 then raise exception 'Invalid learning progress'; end if;
  if (select count(*) from jsonb_object_keys(incoming)) > 2000 then raise exception 'Too many topics'; end if;
  insert into public.learning_progress(user_id) values (owner_id) on conflict (user_id) do nothing;
  select progress into merged from public.learning_progress where user_id = owner_id for update;
  for topic, item in select key, value from jsonb_each(incoming) order by key loop
    if topic !~ '^[a-z0-9-]{1,240}$' or jsonb_typeof(item) <> 'object' then raise exception 'Invalid topic'; end if;
    previous := coalesce(merged -> topic, '{}'::jsonb); checked_item := previous;
    review_time := coalesce(item ->> 'reviewUpdatedAt', item ->> 'reviewedAt');
    if review_time is not null then
      if review_time !~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$' then raise exception 'Invalid review date'; end if;
      perform review_time::timestamptz;
      if item ->> 'reviewedAt' is not null then
        if (item ->> 'reviewedAt') !~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$' then raise exception 'Invalid reviewed date'; end if;
        perform (item ->> 'reviewedAt')::timestamptz;
      end if;
      stored_time := coalesce(previous ->> 'reviewUpdatedAt', previous ->> 'reviewedAt', '');
      if review_time > stored_time then checked_item := checked_item || jsonb_build_object('reviewUpdatedAt', review_time, 'reviewedAt', item ->> 'reviewedAt'); end if;
    end if;
    practice := item -> 'practice';
    if practice is not null then
      if jsonb_typeof(practice) <> 'object' or jsonb_typeof(practice -> 'correct') is distinct from 'number' or jsonb_typeof(practice -> 'total') is distinct from 'number' then raise exception 'Invalid practice score'; end if;
      if (practice ->> 'correct')::numeric <> trunc((practice ->> 'correct')::numeric) or (practice ->> 'total')::numeric <> trunc((practice ->> 'total')::numeric)
        or (practice ->> 'total')::numeric not between 1 and 10000 or (practice ->> 'correct')::numeric not between 0 and (practice ->> 'total')::numeric then raise exception 'Invalid practice score'; end if;
      practice_time := practice ->> 'completedAt';
      if practice_time is null or practice_time !~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$' then raise exception 'Invalid practice date'; end if;
      perform practice_time::timestamptz;
      if jsonb_typeof(practice -> 'weakSections') is distinct from 'array' then raise exception 'Invalid review sections'; end if;
      if jsonb_array_length(practice -> 'weakSections') > 100 or exists (select 1 from jsonb_array_elements(practice -> 'weakSections') value where jsonb_typeof(value) <> 'string' or length(value #>> '{}') > 300) then raise exception 'Invalid review sections'; end if;
      if practice_time > coalesce(previous #>> '{practice,completedAt}', '') then checked_item := checked_item || jsonb_build_object('practice', jsonb_build_object('correct', practice -> 'correct', 'total', practice -> 'total', 'completedAt', practice_time, 'weakSections', practice -> 'weakSections')); end if;
    end if;
    if checked_item <> '{}'::jsonb then merged := jsonb_set(merged, array[topic], checked_item); end if;
  end loop;
  if (select count(*) from jsonb_object_keys(merged)) > 2000 then raise exception 'Too many topics'; end if;
  update public.learning_progress set progress = merged where user_id = owner_id;
  return merged;
end;
$$;
revoke all on function public.merge_learning_progress(jsonb) from public, anon;
grant execute on function public.merge_learning_progress(jsonb) to authenticated;
