
import { ICart } from "@/types/ProductType"

export async function getCart(cartId: number) {

    const res = await fetch(`http://localhost:3333/getCartById/${cartId}`, {
        method: 'GET'
    })

    const cart: ICart = await res.json()

    if (!res.ok) {
        console.log('Failed to fetch data')
    }

    return cart
}

export async function createCart(sessionId: string) {

    const res = await fetch('http://localhost:3333/createCart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "sessionId": sessionId })
    });

    if (!res.ok) {
        console.log("createCart error")
    }

    const cart: ICart  = await res.json()

    return cart

}


export async function removeProductCartQuantity({ productId, cartId }: { productId: string, cartId: number }) {

    console.log("removeProductCart")
    const res = await fetch('http://localhost:3333/removeProductCartQuantity', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "cartid": cartId, "productid": productId })
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const cart = await res.json()

    return cart

}

export async function removeProductCart({ productId, cartId }: { productId: string, cartId: number }) {

    console.log("removeProductCart")
    const res = await fetch('http://localhost:3333/removeProductCart', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "cartid": cartId, "productid": productId })
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const cart = await res.json()

    return cart

}

export async function addProductCart({ productId, cartId }: { productId: string, cartId: number }) {

    const res = await fetch('http://localhost:3333/addProductCart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "cartid": cartId, "productid": productId })
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const cart = await res.json()

    return cart

}

