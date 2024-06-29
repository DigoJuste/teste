import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    await prisma.produto.create({
        data: {
          id: "pf0ZoB1FwH6",
          name: 'Floratta',
          price: 60,
          image: "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B55659/b0c6e450-3243-40d3-a32f-e862fc49f619-bot-55659-floratta-romance-de-verao-ambientada-04.jpg"
        },
    });
    await prisma.produto.create({
        data: {
          id: "pmSjGCTfn8w",
          name: 'Malbec',
          price: 210,
          image: "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/B80761/B80761_Malbec-Flame-Desodorante-Colonia-100ml_.jpg"
        },
    });
    await prisma.produto.create({
        data: {
          id: "pht4Xx5nHMB",
          name: 'Her Code',
          price: 150,
          image: 'https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/product/B50022/e96941b2-24cc-4117-ba35-42b12a2d919a-bot-50022-her-code-perfume-edp-perfume-frontal-01.jpg'
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