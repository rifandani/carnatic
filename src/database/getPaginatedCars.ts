import { ParsedUrlQuery } from 'querystring';
import { getAsString } from '../getAsString';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function getValueStr(value: string | string[]) {
  const str = getAsString(value);

  // jika str berupa string bukan null | undefined, maka lakukan if statement
  return !str || str.toLowerCase() === 'all' ? null : str;
}

export function getValueNumber(value: string | string[]) {
  const str = getValueStr(value);
  const number = parseInt(str);

  return isNaN(number) ? null : number;
}

export async function getPaginatedCars(query: ParsedUrlQuery) {
  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    make: getValueStr(query.make) || undefined,
    model: getValueStr(query.model) || undefined,
    minPrice: getValueNumber(query.minPrice) || undefined,
    maxPrice: getValueNumber(query.maxPrice) || undefined,
  };

  const mainQuery = {
    AND: [
      {
        make: {
          equals: dbParams.make,
        },
      },
      {
        model: {
          equals: dbParams.model,
        },
      },
      {
        price: {
          gte: dbParams.minPrice,
        },
      },
      {
        price: {
          lte: dbParams.maxPrice,
        },
      },
    ],
  };

  const cars = await prisma.car.findMany({
    where: mainQuery,
    skip: offset,
    take: rowsPerPage,
  });

  const totalRowsPerPage = await prisma.car.count({
    where: mainQuery,
  });

  return {
    cars,
    totalPages: Math.ceil(totalRowsPerPage / rowsPerPage),
  };
}

// const mainQuery = `
// FROM Car
// WHERE (@make IS NULL OR @make = make)
// AND (@model IS NULL OR @model = model)
// AND (@minPrice IS NULL OR @minPrice <= price)
// AND (@maxPrice IS NULL OR @maxPrice >= price)
// `;

// const dbParams = {
//   '@make': getValueStr(query.make),
//   '@model': getValueStr(query.model),
//   '@minPrice': getValueNumber(query.minPrice),
//   '@maxPrice': getValueNumber(query.maxPrice),
// };

// const carsPromise = db.all<CarModel[]>(
//   ` SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset `,
//   {
//     ...dbParams,
//     '@rowsPerPage': rowsPerPage,
//     '@offset': offset,
//   },
// );

// const totalRowsPromise = db.get<{ count: number }>(
//   ` SELECT COUNT(*) as count ${mainQuery} `,
//   dbParams,
// );

// const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);
