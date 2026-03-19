import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAnimals = async (req: Request, res: Response) => {
  const animals = await prisma.animal.findMany();
  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response) => {
  const animal = await prisma.animal.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(animal);
};

export const createAnimal = async (req: Request, res: Response) => {
  const animal = await prisma.animal.create({ data: req.body });
  res.status(201).json(animal);
};

export const updateAnimal = async (req: Request, res: Response) => {
  const animal = await prisma.animal.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(animal);
};

export const deleteAnimal = async (req: Request, res: Response) => {
  await prisma.animal.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ message: "Deleted" });
};
