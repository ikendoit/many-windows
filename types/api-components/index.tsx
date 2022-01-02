import { PaneWindowsTab } from "../ui-components";

// Hydrated meaning "data" field has been JSON.parsed
// tags: backend, rules, logic, technical-logic, data-parse, naming-convention
export interface HydratedTabGroupUnLocked {
  id: string;
  data: PaneWindowsTab[];
  encrypted_with_password?: boolean;
  unlocked: true;
}

export interface HydratedTabGroupLocked {
  id: string;
  data: string;
  encrypted_with_password?: boolean;
  unlocked: false;
}

export interface DehydratedTabGroup {
  id: string;
  data: string;
  associated_email?: string;
  encrypted_with_password?: boolean
}