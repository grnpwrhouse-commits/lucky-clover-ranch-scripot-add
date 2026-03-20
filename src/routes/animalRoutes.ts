import { Router } from "express";
import * as animalController from "../controllers/animalController";

const router = Router();

router.get("/availability", animalController.getAvailability);
router.get("/", animalController.getAnimals);
router.get("/:id", animalController.getAnimalById);
router.post("/", animalController.createAnimal);
router.patch("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

export default router; // ← THIS LINE IS REQUIRED
