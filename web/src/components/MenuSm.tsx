import React, { useState } from 'react';
import Link from 'next/link';

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="p-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                { }
                <svg
                    className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
                <svg
                    className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <ul
                className={`absolute top-full left-0 w-full bg-black text-white p-4 rounded-md shadow-md mt-2 transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
            >
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
        </div>
    );
}

export default HamburgerMenu;
