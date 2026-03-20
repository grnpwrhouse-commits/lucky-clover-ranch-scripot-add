import { useState } from "react";
import { useRentalFormData } from "../hooks/useRentalFormData";

const API_URL = "http://localhost:3000/api";

export const RentalForm = () => {
  const [form, setForm] = useState({
    animalId: "",
    clientId: "",
    startDate: "",
    endDate: "",
    price: "",
    notes: "",
    contractUrl: "",
  });

  const { animals, clients, loading, error } = useRentalFormData();

  const selectedAnimal = animals.find((a) => a.id === Number(form.animalId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      animalId: Number(form.animalId),
      clientId: Number(form.clientId),
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      price: Number(form.price),
      notes: form.notes || undefined,
      contractUrl: form.contractUrl || undefined,
    };

    try {
      const res = await fetch(`${API_URL}/rentals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create rental");
      }

      alert("✅ Rental created successfully!");

      // Reset form
      setForm({
        animalId: "",
        clientId: "",
        startDate: "",
        endDate: "",
        price: "",
        notes: "",
        contractUrl: "",
      });
    } catch (err: any) {
      alert("❌ " + (err.message || "Something went wrong"));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create Rental</h2>

      {/* ANIMAL DROPDOWN */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Animal:*
        <select
          value={form.animalId}
          onChange={(e) => setForm({ ...form, animalId: e.target.value })}
          required
          style={{ display: "block", marginTop: "5px" }}
        >
          <option value="">-- Select Animal --</option>
          {animals.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.tagNumber})
            </option>
          ))}
        </select>
      </label>

      {/* CLIENT DROPDOWN */}
      <label style={{ display: "block", marginBottom: "10px"*
