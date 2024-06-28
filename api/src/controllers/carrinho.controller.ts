import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/createCart', async (req: Request, res: Response) => {
    try {
        const sessionId = req.body.sessionId;

        const cart = await prisma.carrinho.create({
            data: {
                sessionId: sessionId,
                items: [],
                total: 0,
                updatedAt: new Date(),
            },
        });

        res.status(201).json({cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar carrinho' });
    }
});

export default router;