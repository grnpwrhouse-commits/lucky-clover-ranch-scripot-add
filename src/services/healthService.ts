import prisma from '../lib/prisma.ts';

export const getHealthRecordsByAnimal = async (animalId: number) => {
  return prisma.healthRecord.findMany({
    where: { animalId },
    orderBy: { date: 'desc' },
  });
};

export const createHealthRecord = async (data: any) => {
  return prisma.healthRecord.create({ data });
};
