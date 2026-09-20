"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchStoreSettings, DEFAULT_STORE_SETTINGS, type StoreSettings } from "@/lib/api";

type SettingsContextValue = {
  settings: StoreSettings;
  loading: boolean;
};

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_STORE_SETTINGS,
  loading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchStoreSettings()
      .then((data) => {
        if (mounted && data) {
          setSettings(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load WordPress site settings:", err);
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
