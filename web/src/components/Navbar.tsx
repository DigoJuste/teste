import Link from "next/link";
import { useState } from "react";
import Cart from "./Cart";
import { ICart } from "@/types/ProductType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "@/services/store";
import HamburgerMenu from "./MenuSm";

interface NavbarProps {
    cart: ICart
}

const Navbar = ({ cart }: NavbarProps) => {

    const [open, setOpen] = useState(false);

    const { data } = useQuery<ICart>({
        queryFn: () => getCart(cart.id),
        queryKey: ["getCart", cart.id],
        initialData: cart
    });

    const items = data.items != '' ? JSON.parse(data?.items) : [];

    return (
        <>
            <div className="bg-black text-white text-center py-0.1">
                <p className="text-sm font-smal">Beauty Week</p>
            </div>
            <nav className="bg-gradient-to-r from-gray-400 to-gray-900 text-white p-5">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                        <h1 className="text-2xl font-family: Monaco">OBoticário</h1>
                    </Link>
                    <div className="md:hidden">
                        <HamburgerMenu />
                    </div>

                    <ul className="flex space-x-6 max-xl:hidden">
                        <li>
                            <Link href="/">Gift Guide</Link>
                        </li>
                        <li>
                            <Link href="/">Best Sellers</Link>
                        </li>
                        <li>
                            <Link href="/">Shop</Link>
                        </li>
                        <li>
                            <Link href="/">Gifts</Link>
                        </li>
                        <li>
                            <Link href="/">Brands</Link>
                        </li>
                        <li>
                            <Link href="/">Sale</Link>
                        </li>
                        <li>
                            <Link href="/">Stores</Link>
                        </li>
                        <li>
                            <Link href="/">About</Link>
                        </li>
                    </ul>
                    <>
                        <div className="flex space-x-4 cursor-pointer">
                            <button>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            <button>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </button>
                            <button className="relative" onClick={() => setOpen(!open)}>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="bg-green-700 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">{items.length}</span>
                            </button>
                        </div>
                        {open && (
                            <div onClick={() => setOpen(!open)} className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">
                                <div onClick={(e) => e.stopPropagation()} className="absolute bg-gray-100 right-0 top-0 w-1/2 h-screen p-12 overflow-scroll max-w-[40rem]">
                                    <div className="flex h-screen w-full">
                                        <Cart cart={data} />
                                    </div>
                                </div>


                            </div>
                        )}

                    </>
                </div>
            </nav>
        </>


    );
};

export default Navbar