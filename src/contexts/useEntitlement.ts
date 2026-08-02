import { useContext } from "react";
import { EntitlementContext, type EntitlementContextValue } from "./entitlement-context";

export const useEntitlement = (): EntitlementContextValue => {
  const context = useContext(EntitlementContext);
  if (!context) throw new Error("useEntitlement must be used within EntitlementProvider");
  return context;
};
