const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // all FAQ
  const faq = await prisma.fAQ.findMany({
    orderBy: {
      createDate: 'desc',
    },
  });
  console.log(faq);

  // all Cars
  // const cars = await prisma.car.findMany();
  // console.log(cars);

  // get Makes
  // const makes = await prisma.car.findMany({
  //   select: {
  //     make: true,
  //   },
  //   orderBy: {
  //     make: 'desc',
  //   },
  // });
  // console.log(makes);

  // get Models
  // const model = await prisma.car.findMany({
  //   select: {
  //     model: true,
  //   },
  //   where: {
  //     make: 'BMW',
  //   },
  //   orderBy: {
  //     model: 'desc',
  //   },
  // });
  // console.log(model);

  // count model
  // const count = await prisma.car.count({
  //   where: {
  //     make: 'BMW',
  //   },
  //   orderBy: {
  //     model: 'desc',
  //   },
  // });
  // console.log(count);
}

main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
