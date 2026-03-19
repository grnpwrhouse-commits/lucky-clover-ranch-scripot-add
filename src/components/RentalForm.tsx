// src/components/RentalForm.tsx
import { useState } from "react";
import { useRentalFormData } from "./hooks/useRentalFormData";
import { apiRequest } from "../lib/api"; // adjust path if needed

export const RentalForm = () => {
  // ----- Form state -------------------------------------------------
  const [form, setForm] = useState({
    animalId: "",   // will hold the selected animal's id (string)
    clientId: "",   // will hold the selected client's id (string)
    startDate: "",
    endDate: "",
    price: "",
    notes: "",
    contractUrl: "",
  });

  const { animals, clients, loading, error } = useRentalFormData();

  // ----- Helper: show selected animal name/tag (your UX tweak) -----
  const selectedAnimal = animals.find(
    (a) => a.id === Number(form.animalId)
  );

  // ----- Submit handler --------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // NOTE: The backend still validates everything (Zod, overlap, injured, etc.)
      await apiRequest("/rentals", {
        method: "POST",
        body: JSON.stringify(form),
      });
      alert("✅ Rental created successfully!");
      // Optional: reset form after success
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
      // Show the exact message your backend returns (no silent failures)
      alert(err.message || "❌ Something went wrong");
    }
  };

  // ----- Render ----------------------------------------------------
  if (loading) {
    return <p>Loading ranch data…</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>❌ {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto" }}>
      {/* ---------- ANIMAL DROPDOWN ---------- */}
      <label style={{ display: "block", marginBottom: "8px" }}>
        Animal:*
        <select
          value={form.animalId || ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, animalId: e.target.value }))
          }
          required
        >
          <option value="">-- Select Available Animal --</option>
          {/* 👉 FILTER: only show animals where isAvailable === true */}
          {animals
            .filter((a) => a.isAvailable)
            .map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.tagNumber})
              </option>
            ))}
        </select>
      </label>

      {/* ---------- CLIENT DROPDOWN ---------- */}
      <label style={{ display: "block", marginBottom: "8px" }}>
        Client:*
        <select
          value={form.clientId || ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, clientId: e.target.value }))
          }
          required
        >
          <option value="">-- Select Client --</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {/* ---------- SELECTED ANIMAL INFO (your UX tweak) ---------- */}
      {selectedAnimal && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f0f8ff",
            borderRadius: "4px",
            fontSize: "0.9em",
          }}
        >
          <strong>Selected Animal:</strong>{" "}
          {selectedAnimal.name} ({selectedAnimal.tagNumber})
        </div>
      )}

      {/* ---------- THE REST OF YOUR FORM (keep as‑is) ---------- */}
      <label style={{ display: "block", marginBottom: "8px" }}>
        Start Date:*
        <input
          type="datetime-local"
          value={form.startDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, startDate: e.target.value }))
          }
          required
        />
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        End Date:*
        <input
          type="datetime-local"
          value={form.endDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, endDate: e.target.value }))
          }
          required
        />
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        Price:*
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, price: e.target.value }))
          }
          required
        />
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        Notes:
        <textarea
          value={form.notes}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, notes: e.target.value }))
          }
          rows={3}
        />
      </label>

      <label style={{ display: "block", marginBottom: "8px" }}>
        Contract URL (optional):
        <input
          type="text"
          value={form.contractUrl}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              contractUrl: e.target.value,
            }))
          }
          placeholder="https://example.com/contract.pdf"
        />
      </label>

      <button
        type="submit"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius": "4px",
          cursor: "pointer",
        }}
      >
        Create Rental
      </button>
    </form>
  );
};
