-- Beta belge/sertifika takibi: kullanıcıya özel metadata ve özel fotoğraf kasası.

create table if not exists public.maritime_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null check (char_length(document_type) between 1 and 100),
  title text not null check (char_length(title) between 1 and 160),
  document_number text,
  holder_name text,
  issuing_authority text,
  issuing_country text,
  issue_date date,
  expiry_date date,
  no_expiry boolean not null default false,
  confidence numeric(4, 3) not null default 0 check (confidence between 0 and 1),
  review_required boolean not null default true,
  date_evidence text,
  warnings text[] not null default '{}'::text[],
  reminder_days smallint[] not null default '{180,90,30,7,1,0}'::smallint[],
  image_path text not null check (char_length(image_path) between 1 and 500),
  original_filename text,
  mime_type text not null default 'image/jpeg',
  content_hash text not null check (content_hash ~ '^[a-f0-9]{64}$'),
  raw_analysis jsonb not null default '{}'::jsonb,
  analysis_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint maritime_documents_user_hash_unique unique (user_id, content_hash),
  constraint maritime_documents_expiry_mode_check check (not no_expiry or expiry_date is null)
);

create index if not exists maritime_documents_user_expiry_idx
  on public.maritime_documents (user_id, expiry_date)
  where expiry_date is not null;

alter table public.maritime_documents enable row level security;

drop policy if exists "Users can read own maritime documents" on public.maritime_documents;
create policy "Users can read own maritime documents"
  on public.maritime_documents for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own maritime documents" on public.maritime_documents;
create policy "Users can insert own maritime documents"
  on public.maritime_documents for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own maritime documents" on public.maritime_documents;
create policy "Users can update own maritime documents"
  on public.maritime_documents for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own maritime documents" on public.maritime_documents;
create policy "Users can delete own maritime documents"
  on public.maritime_documents for delete
  to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.maritime_documents to authenticated;

create or replace function public.set_maritime_document_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists maritime_documents_set_updated_at on public.maritime_documents;
create trigger maritime_documents_set_updated_at
  before update on public.maritime_documents
  for each row execute function public.set_maritime_document_updated_at();

-- Bucket özel kalır; kullanıcının UUID'si nesne yolunun ilk segmentidir.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'maritime-documents',
  'maritime-documents',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can read own maritime document images" on storage.objects;
create policy "Users can read own maritime document images"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'maritime-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can upload own maritime document images" on storage.objects;
create policy "Users can upload own maritime document images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'maritime-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can update own maritime document images" on storage.objects;
create policy "Users can update own maritime document images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'maritime-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'maritime-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can delete own maritime document images" on storage.objects;
create policy "Users can delete own maritime document images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'maritime-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
