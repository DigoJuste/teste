import request from 'supertest';
import app from '../index'; // Sua instância do Express
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Carrinho Controller', () => {

    let cartId = 1;

  it('should create a new cart', async () => {
    
    const carrinho = {
        sessionId: "1234",
        items: [""],
        total: 0,
        updatedAt: new Date(),
    }

    const res = await request(app)
      .post('/createCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.sessionId).toBe(carrinho.sessionId);
    expect(res.body.items).toEqual(carrinho.items);

    cartId = res.body.id;
  });

  it('should get cart', async () => {
    
    const carrinho = {
      cartid: cartId
    }

    const res = await request(app)
      .get(`/getCartById/${cartId}`);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(carrinho.cartid);
  });

  it('should add product', async () => {
    
    const carrinho = {
        cartid: cartId,
        productid: "pht4Xx5nHMB"
    }

    const res = await request(app)
      .post('/addProductCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).toContain(carrinho.productid);

  });

  it('should add product already existing', async () => {
    
    const carrinho = {
        cartid: cartId,
        productid: "pht4Xx5nHMB"
    }

    const res = await request(app)
      .post('/addProductCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).toContain(carrinho.productid);
    expect(res.body.cart.items).toContain("quantity\":2");

  });

  it('should add non-existing product', async () => {
    
    const carrinho = {
        cartid: cartId,
        productid: "pmSjGCTfn8w"
    }

    const res = await request(app)
      .post('/addProductCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).toContain(carrinho.productid);

  });

  it('should remove product', async () => {
    
    const carrinho = {
        cartid: cartId,
        productid: "pmSjGCTfn8w"
    }

    const res = await request(app)
      .put('/removeProductCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).not.toContain(carrinho.productid);
  });

  it('should remove product quantity', async () => {
    
    const carrinho = {
        cartid: cartId,
        productid: "pht4Xx5nHMB"
    }

    const res = await request(app)
      .put('/removeProductCartQuantity')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).toContain(carrinho.productid);
    expect(res.body.cart.items).toContain("quantity\":1");

    await prisma.carrinho.delete({ where: { id: res.body.cart.id } });

  });
});