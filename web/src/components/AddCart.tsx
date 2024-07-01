'use client'

import { ProductType } from "../types/ProductType"
import { createCart, getCart, useCartStore } from "./store";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

export default function AddCart({ product }: { product: ProductType }) {
    //const { addToCart } = useCartStore();
    // const [cookies, setCookie] = useCookies(['cartId', 'sessionId']);
    // console.log("cookies.sessionId" + cookies.sessionId);

    return (
       // <button onClick={() => addToCart(product, cookies.cartId)} className="font-mono bg-emerald-800 text-white p-10.5 py-2.5 text-sm text-center uppercase">add to cart</button>
        <button className="font-mono bg-emerald-800 text-white p-10.5 py-2.5 text-sm text-center uppercase">add to cart</button>
    );
}