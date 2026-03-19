import { Router } from "express";
import * as animalController from "../controllers/animalController";

const router = Router();

// ? Availability FIRST (important)
router.get("/availability", async (req, res) => {
  res.json([]);
});

// ? CRUD
router.get("/", animalController.getAnimals);
router.get("/:id", animalController.getAnimalById);
router.post("/", animalController.createAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

// ? THIS FIXES YOUR ERROR
export default router;
