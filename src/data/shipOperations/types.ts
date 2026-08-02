export type DepartmentId = 'guverte' | 'makine';

export interface ShipOperation {
  /** Liste ekranında ve accordion başlığında görünen kısa başlık. */
  title: string;
  /** 1-2 cümlelik amaç / tanım. */
  purpose: string;
  /** Adım adım uygulama akışı. */
  procedure: string[];
  /** SOLAS, MARPOL, STCW, IMDG, IMSBC, ISM, ISPS, MLC, COLREG, BWM vb. atıflar. */
  regulations?: string[];
  /** Kritik güvenlik / risk uyarıları. */
  safety?: string[];
  /** Tutulması gereken kayıt, defter, form veya checklist'ler. */
  records?: string[];
}

export interface ShipOperationDepartment {
  id: DepartmentId;
  label: string;
  operations: ShipOperation[];
}

export interface ShipType {
  id: string;
  label: string;
  description: string;
  emoji: string;
  /** Kitap kapağının bez cilt rengi (Tailwind gradyan sınıfları). */
  color: string;
  departments: ShipOperationDepartment[];
}
