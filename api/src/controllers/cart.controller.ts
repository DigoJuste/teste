import { Request, Response, Router } from 'express';
import { addProductCart, createCart, getcartById, removeProductCart, removeProductCartQuantity } from '../services/cart.service';
import HttpException from '../models/http-exception.model';

const router = Router();

router.get('/getCartById/:id', async (req: Request, res: Response) => {
    try {
        const cartid = Number(req.params.id);

        if (!cartid) {
            throw new HttpException(422, { cartid: "can't be blank" });
        }

        const cart = await getcartById(cartid);

        res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter carrinho', message: error.message });
    }
});

router.post('/createCart', async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            throw new HttpException(422, { sessionId: "can't be blank" });
        }

        const cart = await createCart(sessionId);

        res.status(201).json( cart );
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao criar carrinho', message: error.message });
    }
});

router.post('/addProductCart', async (req: Request, res: Response) => {
    try {
        const { cartid, productid } = req.body;

        if (!cartid) {
            throw new HttpException(422, { cartid: "can't be blank" });
        }

        if (!productid) {
            throw new HttpException(422, { productid: "can't be blank" });
        }

        const cart = await addProductCart(cartid, productid);

        res.status(201).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao adicionar produto', message: error.message });
    }
});

router.put('/removeProductCartQuantity', async (req: Request, res: Response) => {
    try {
        const { cartid, productid } = req.body;

        if (!cartid) {
            throw new HttpException(422, { cartid: "can't be blank" });
        }

        if (!productid) {
            throw new HttpException(422, { productid: "can't be blank" });
        }

        const cart = await removeProductCartQuantity(cartid, productid);

        res.status(201).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao remover produto', message: error.message });
    }
});

router.put('/removeProductCart', async (req: Request, res: Response) => {
    try {
        const { cartid, productid } = req.body;

        if (!cartid) {
            throw new HttpException(422, { cartid: "can't be blank" });
        }

        if (!productid) {
            throw new HttpException(422, { productid: "can't be blank" });
        }

        const cart = await removeProductCart(cartid, productid);

        res.status(201).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao remover produto', message: error.message });

    }
});

export default router;
