import { useStoredState } from "@/components/tools/useStoredState";

/** Form state of one navigation tool, kept on this device. `set(key)` returns a field setter. */
export function useNavForm<T extends object>(toolId: string, initial: T) {
  const [form, setForm] = useStoredState(`marine-expert-nav:${toolId}`, initial);
  const set =
    <K extends keyof T>(key: K) =>
    (value: T[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));
  return { form, setForm, set };
}
