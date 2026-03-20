import express from "express";
import animalRoutes from "./src/routes/animalRoutes"; // ← CRITICAL: NO .ts EXTENSION, DEFAULT IMPORT

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/animals", animalRoutes);
// TEMPORARILY DISABLE USER ROUTES TO ISOLATE ANIMALS:
// app.use("/api/users", userRoutes); // ← COMMENT THIS OUT IF YOU DON'T HAVE WORKING userRoutes YET

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Animal availability: http://localhost:${PORT}/api/animals/availability`);
});
