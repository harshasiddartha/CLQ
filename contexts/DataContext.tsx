"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { CompanyData, fetchAllCompanyData } from '@/utils/githubFetcher';

interface DataContextType {
  companyData: Map<string, CompanyData[]>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [companyData, setCompanyData] = useState<Map<string, CompanyData[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCompanyData();
      setCompanyData(data);
    } catch (err) {
      setError('Failed to fetch company data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{ companyData, loading, error, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

