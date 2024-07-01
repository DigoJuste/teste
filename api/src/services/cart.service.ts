import { PrismaClient } from '@prisma/client';
import HttpException from '../models/http-exception.model';
import { getProductById } from './product.service';

const prisma = new PrismaClient();

export const addProductCart = async (cartid: number, productid: string) => {

    let productAdded = false;

    const { cart, product } = await getCartAndProduct(cartid, productid);

    const productModel = { ...product, quantity: 1 }

    const cartProducts = cart.items == "" ? [] : JSON.parse(cart.items.toString());

    const newCartProducts = cartProducts.map((productCart) => {
        if (productCart.id == productid) {
            productAdded = true;
            return { ...productCart, quantity: productCart.quantity + 1 }
        }
        return productCart
    })

    productAdded ? "" : newCartProducts.push(productModel);

    cart.items = JSON.stringify(newCartProducts);
    cart.total = 0;
    cart.updatedAt = new Date();

    for (const produto of newCartProducts) {
        cart.total = cart.total + (produto.price * produto.quantity)
    }

    return await prisma.carrinho.update({
        where: {
            id: cart.id
        },
        data: {
            ...cart
        }
    })

}

export const removeProductCartQuantity = async (cartid: number, productid: string) => {

    const { cart } = await getCartAndProduct(cartid, productid);

    let cartProducts = cart.items == "" ? [] : JSON.parse(cart.items.toString());

    let newCartProducts = cartProducts.map((productCart) => {
        if (productCart.id == productid) {
            return { ...productCart, quantity: productCart.quantity - 1 }
        } else {
            return productCart
        }
    });

    newCartProducts = newCartProducts.filter(product => product.quantity > 0);

    cart.items = JSON.stringify(newCartProducts);
    cart.total = 0;
    cart.updatedAt = new Date();

    for (const produto of newCartProducts) {
        cart.total = cart.total + (produto.price * produto.quantity)
    }

    return await prisma.carrinho.update({
        where: {
            id: cart.id
        },
        data: {
            ...cart
        }
    })

}

export const removeProductCart = async (cartid: number, productid: string) => {

    const { cart } = await getCartAndProduct(cartid, productid);

    let cartProducts = cart.items == "" ? [] : JSON.parse(cart.items.toString());

    let newCartProducts = cartProducts.map((productCart) => {
        if (productCart.id == productid) {
            return { ...productCart, quantity: 0 }
        } else {
            return productCart
        }
    });

    newCartProducts = newCartProducts.filter(product => product.quantity > 0);

    cart.items = JSON.stringify(newCartProducts);
    cart.total = 0;
    cart.updatedAt = new Date();

    for (const produto of newCartProducts) {
        cart.total = cart.total + (produto.price * produto.quantity)
    }

    return await prisma.carrinho.update({
        where: {
            id: cart.id
        },
        data: {
            ...cart
        }
    })

}

export const getcartById = async (cartid: number) => {

    const cart = await prisma.carrinho.findUnique({
        where: {
            id: cartid,
        }
    });

    if (!cart) {
        throw new HttpException(422, { cart: "not found" });
    }

    const inativeTime = Date.now() - cart.updatedAt.getTime();

    if (inativeTime > 24 * 60 * 60 * 1000) {
        throw new HttpException(422, { cart: "not found" });
    }

    return cart;

}

export const createCart = async (sessionId: string) => {

    const cart =  await prisma.carrinho.create({
        data: {
            sessionId: sessionId,
            items: [""],
            total: 0,
            updatedAt: new Date(),
        },
    });

    return cart;

}

const getCartAndProduct = async (cartid: number, productid: string) => {

    const cart = await getcartById(cartid)
    const product = await getProductById(productid);

    return { cart, product }

}

