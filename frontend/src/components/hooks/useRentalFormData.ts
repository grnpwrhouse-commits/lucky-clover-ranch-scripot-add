import { useState, useEffect } from "react";

interface Animal {
  id: number;
  name: string;
  tagNumber: string;
  isAvailable: boolean;
}

interface Client {
  id: number;
  name: string;
}

interface RentalFormData {
  animals: Animal[];
  clients: Client[];
  loading: boolean;
  error: string | null;
}

export function useRentalFormData(): RentalFormData {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/animals").then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
    ])
      .then(([a, c]) => {
        setAnimals(Array.isArray(a) ? a : []);
        setClients(Array.isArray(c) ? c : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { animals, clients, loading, error };
}