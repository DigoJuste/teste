import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import HttpException from '../models/http-exception.model';

const router = Router();

const prisma = new PrismaClient();

router.get('/getAllProducts', async (req: Request, res: Response) => {
    try {

        const products = await prisma.produto.findMany();

        res.status(201).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter produtos', message: error.message });
    }
});

export default router;
