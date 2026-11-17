'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_CMS_DATA,
  normalizeCmsData,
  type CmsStoreData,
} from '../lib/cms';

const STORAGE_KEY = 'celikpen_cms_cache_v1';
const LIVE_OVERRIDE_KEY = 'celikpen_cms_live_override';
export const CMS_UPDATE_EVENT = 'celikpen-cms-updated';

interface CmsContextValue {
  cms: CmsStoreData;
  setCmsState: (next: CmsStoreData) => void;
  refreshCms: () => Promise<void>;
}

const CmsContext = createContext<CmsContextValue>({
  cms: DEFAULT_CMS_DATA,
  setCmsState: () => {},
  refreshCms: async () => {},
});

function persistToLocalStorage(data: CmsStoreData) {
  try {
    const json = JSON.stringify(data);
    window.localStorage.setItem(STORAGE_KEY, json);
    window.localStorage.setItem(LIVE_OVERRIDE_KEY, json);
  } catch {
    // Ignore storage quota errors
  }
}

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<CmsStoreData>(DEFAULT_CMS_DATA);

  const setCmsState = useCallback((next: CmsStoreData) => {
    const normalized = normalizeCmsData(next);
    setCms(normalized);
    persistToLocalStorage(normalized);
    try {
      window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: normalized }));
    } catch {
      // Ignore event errors
    }
  }, []);

  const refreshCms = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/cms?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return;
      const payload = (await response.json()) as { ok?: boolean; data?: CmsStoreData };
      if (payload.ok && payload.data) {
        const serverData = normalizeCmsData(payload.data);
        setCms((prev) => {
          const prevTime = new Date(prev.updatedAt || 0).getTime();
          const serverTime = new Date(serverData.updatedAt || 0).getTime();
          const chosen = serverTime >= prevTime ? serverData : prev;
          persistToLocalStorage(chosen);
          return chosen;
        });
      }
    } catch {
      // Ignore network errors and keep default/cached store
    }
  }, []);

  useEffect(() => {
    try {
      const cached =
        window.localStorage.getItem(LIVE_OVERRIDE_KEY) ||
        window.localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Partial<CmsStoreData>;
        const cachedData = normalizeCmsData(parsed);
        const defaultTime = new Date(DEFAULT_CMS_DATA.updatedAt || 0).getTime();
        const cachedTime = new Date(cachedData.updatedAt || 0).getTime();
        if (cachedTime >= defaultTime) {
          setCms(cachedData);
        }
      }
    } catch {
      // Ignore invalid JSON
    }

    void refreshCms();

    const handleStorage = (event: StorageEvent) => {
      if (
        (event.key === STORAGE_KEY || event.key === LIVE_OVERRIDE_KEY) &&
        event.newValue
      ) {
        try {
          setCms(normalizeCmsData(JSON.parse(event.newValue)));
        } catch {
          // Ignore
        }
      }
    };

    const handleCustomEvent = (event: Event) => {
      const custom = event as CustomEvent<CmsStoreData>;
      if (custom.detail) {
        setCms(normalizeCmsData(custom.detail));
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(CMS_UPDATE_EVENT, handleCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CMS_UPDATE_EVENT, handleCustomEvent);
    };
  }, [refreshCms]);

  return (
    <CmsContext.Provider value={{ cms, setCmsState, refreshCms }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms(): CmsContextValue {
  return useContext(CmsContext);
}
