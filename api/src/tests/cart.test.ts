import request from 'supertest';
import app from '../index'; // Sua instância do Express
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Carrinho Controller', () => {

    let cartId = "";

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
    expect(res.body.cart).toHaveProperty('id');
    expect(res.body.cart.sessionId).toBe(carrinho.sessionId);
    expect(res.body.cart.items).toEqual(carrinho.items);

    cartId = res.body.cart.id;
  });

  it('should get cart', async () => {
    
    const carrinho = {
        cartid: cartId
    }

    const res = await request(app)
      .get('/')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.id).toBe(carrinho.cartid);

    cartId = res.body.cart.id;
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
      .delete('/removeProductCart')
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
      .delete('/removeProductCart')
      .send(carrinho);

    expect(res.status).toBe(201);
    expect(res.body.cart.items).toContain(carrinho.productid);
    expect(res.body.cart.items).toContain("quantity\":1");

    await prisma.carrinho.delete({ where: { id: res.body.cart.id } });

  });
});