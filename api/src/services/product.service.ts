import { PrismaClient } from '@prisma/client';
import HttpException from '../models/http-exception.model';

const prisma = new PrismaClient();

export const getProductById = async (productid: string) => {

    const product =  await prisma.produto.findUnique({
        where: {
            id: productid,
        },
    });

    if (!product) {
        throw new HttpException(422, { product: "not found" });
    }

    return product;


}