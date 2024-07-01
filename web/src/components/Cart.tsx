// components/Cart.tsx

import { removeProductCart, getCart, addProductCart } from '@/services/store';
import { ICart, IProduct } from '@/types/ProductType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ButtonAddItem } from './shared/buttons/ButtonAddItem';
import { ButtonRemoveItem } from './shared/buttons/ButtonRemoveItem';

interface CartProps {
    cart: ICart
}

const Cart: React.FC<CartProps> = ({ cart }) => {
    const { id } = cart;
    const queryClient = useQueryClient();

    const itemNew = cart.items == "" ? [] : JSON.parse(cart.items);
    const data = cart;

    const mutationRemove = useMutation({
        mutationFn: removeProductCart,
        mutationKey: ["removeProductCart"]
    })

    const handleRemove = async (cartId: number, productId: string) => {
        try {
            await mutationRemove.mutateAsync({ cartId, productId })
            queryClient.invalidateQueries({ queryKey: ["getCart"] })
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="p-4 w-full max-w-md text-black mx-auto">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <span>{itemNew?.length} Item</span>
            </div>
            <div className="text-center mb-4">
                <span className="text-sm">Spend more $14.00 to get free shipping!</span>
                <div className="w-full bg-gray-200 h-1 mt-1">
                    <div className="bg-green-500 h-1" style={{ width: '60%' }}></div>
                </div>
            </div>
            {itemNew?.length > 0 ? itemNew?.map((item: IProduct) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                    <div className="flex-1 mx-4">
                        <h2 className="text-lg">{item.name}</h2>
                        <div className="flex items-center">
                            <ButtonRemoveItem cartId={id} itemId={item.id} />
                            <span>{item.quantity}</span>
                            <ButtonAddItem cartId={id} itemId={item.id} fromCart={true} />
                            <button onClick={() => handleRemove(id, item.id)} className="ml-4 text-gray-600 hover:text-gray-900">Remove Item</button>
                        </div>
                    </div>
                    <span className="text-gray-700">${item.price.toFixed(2)}</span>
                </div>
            )) : <p>Sem itens no carrinho</p>}
            <div className="flex justify-between items-center border-t pt-2 mt-4">
                <input type="text" placeholder="Discount code or gift card" className="border p-2 w-full mr-2" />
                <button className="bg-gray-800 text-white px-4 py-2">Apply</button>
            </div>
            <div className="flex justify-between items-center border-t pt-2 mt-4">
                <span>Total:</span>
                <span className="text-gray-700">${data.total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col mt-4">
                <button className="bg-green-800 text-white px-4 py-2 mb-2">Check Out - ${data.total.toFixed(2)}</button>
                <button className="bg-purple-500 text-white px-4 py-2">Shop Pay</button>
            </div>
            <div className="text-center mt-4">
                <span className="text-sm">FREE 30 DAYS RETURNS</span>
                <a className="block text-blue-500">VIEW CART</a>
            </div>
        </div>
    );
};

export default Cart;
