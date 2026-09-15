"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type CustomerMode = "particulier" | "pro";

type CustomerModeValue = {
  mode: CustomerMode;
  isPro: boolean;
  setMode: (mode: CustomerMode) => void;
};

const STORAGE_KEY = "nayuma-customer-mode";

const CustomerModeContext = createContext<CustomerModeValue | null>(null);

export function CustomerModeProvider({ children }: { children: React.ReactNode }) {
  // Particulier par défaut : l'affichage TTC est obligatoire pour les consommateurs.
  const [mode, setModeState] = useState<CustomerMode>("particulier");

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "pro") setModeState("pro");
    } catch {
      // stockage indisponible (navigation privée) : on reste en particulier
    }
  }, []);

  const setMode = useCallback((next: CustomerMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return (
    <CustomerModeContext.Provider value={{ mode, isPro: mode === "pro", setMode }}>
      {children}
    </CustomerModeContext.Provider>
  );
}

export function useCustomerMode() {
  const ctx = useContext(CustomerModeContext);
  if (!ctx) throw new Error("useCustomerMode must be used within CustomerModeProvider");
  return ctx;
}
