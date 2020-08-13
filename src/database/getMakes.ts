import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface Make {
  make: string;
  // count: number;
}

export async function getMakes() {
  // const makes = await db.all<Make[]>(
  //   'SELECT make, count(*) AS count FROM Car GROUP BY make',
  // );

  const makes = await prisma.car.findMany({
    select: {
      make: true,
    },
    orderBy: {
      make: 'desc',
    },
  });

  return makes;
}
