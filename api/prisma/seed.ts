import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    await prisma.produto.create({
        data: {
          id: "pf0ZoB1FwH6",
          name: 'Floratta',
          price: 60
        },
    });
    await prisma.produto.create({
        data: {
          id: "pmSjGCTfn8w",
          name: 'Malbec',
          price: 210
        },
    });
    await prisma.produto.create({
        data: {
          id: "pht4Xx5nHMB",
          name: 'Her Code',
          price: 150
        },
    });
    console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })