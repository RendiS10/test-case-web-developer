// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Vitamin Kucing A',
        price: 35000,
        description: 'Vitamin untuk kesehatan bulu dan kulit kucing.',
        image: 'https://placekitten.com/200/200',
      },
      {
        name: 'Obat Cacing Kucing',
        price: 25000,
        description: 'Obat cacing khusus kucing, aman dan efektif.',
        image: 'https://placekitten.com/201/201',
      },
      {
        name: 'Multivitamin Kucing',
        price: 40000,
        description: 'Multivitamin lengkap untuk kucing segala usia.',
        image: 'https://placekitten.com/202/202',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
