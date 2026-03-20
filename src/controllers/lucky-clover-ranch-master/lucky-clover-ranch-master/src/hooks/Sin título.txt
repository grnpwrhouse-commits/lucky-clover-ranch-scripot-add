// src/hooks/useRentalFormData.ts
import { useState, useEffect } from "react";
import { apiRequest } from "../lib/api"; // <-- adjust if your path is different

export type AnimalOption = {
  id: number;
  name: string;
  tagNumber: string;
  isAvailable: boolean;
};

export type ClientOption = {
  id: number;
  name: string;
};

export function useRentalFormData() {
  const [animals, setAnimals] = useState<AnimalOption[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Run both requests in parallel
    Promise.all([
      apiRequest<AnimalOption[]>("/animals/availability").then(setAnimals),
      apiRequest<ClientOption[]>("/clients").then(setClients),
    ])
      .catch((err) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        console.error("[useRentalFormData] failed to load data:", err);
      })
      .finally(() => setLoading(false));
  }, []); // empty deps = run once on mount

  return { animals, clients, loading, error };
}
