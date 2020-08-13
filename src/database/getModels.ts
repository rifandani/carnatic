import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface Model {
  model: string;
  // count: number;
}

export async function getModels(make: string) {
  // const model = await db.all<Model[]>(
  //   'SELECT model, count(*) AS count FROM Car WHERE make = ? GROUP BY model',
  //   make,
  // );

  const model = await prisma.car.findMany({
    select: {
      model: true,
    },
    where: {
      make,
    },
    orderBy: {
      model: 'desc',
    },
  });

  return model;
}
