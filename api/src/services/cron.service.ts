import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

//roda a cada 1 hora
export const cronRemoveInativeCart = cron.schedule('0 * * * *', async () => {
  const carrinhos = await prisma.carrinho.findMany();
  for (const carrinho of carrinhos) {
    const tempoInativo = Date.now() - carrinho.updatedAt.getTime();
    if (tempoInativo > 24 * 60 * 60 * 1000) {
      await prisma.carrinho.delete({ where: { id: carrinho.id } });
      console.log(`Carrinho ${carrinho.id} excluído por inatividade.`);
    }
  }
});