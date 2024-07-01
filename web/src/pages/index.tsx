import { Inter } from 'next/font/google'
import Product from '@/components/Product';
import { ICart, IProduct } from '@/types/ProductType';
import { v4 as uuidv4 } from 'uuid';
import { createCart, getCart } from "@/services/store";
import Navbar from '@/components/Navbar';
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

interface ProductProps {
  products: IProduct[],
  cart: ICart
}

const Home = ({ products, cart }: ProductProps) => {
  return (
    <>
      <Navbar cart={cart}></Navbar>
      <div className='max-w-7xl mx-auto pt-8 px-8 xl:px-0'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gas-10 xl:gap-6'>
          {products.map((product: IProduct) => (
            <Product key={product.id} product={product} cartId={cart.id}></Product>
          ))}
        </div>
      </div>
    </>
  )
}

const loadProducts = async () => {
  const res = await fetch('http://localhost:3333/getAllProducts')

  if (!res.ok) {
    return [];
  }

  return res.json()
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const products = await loadProducts();
  const newSessionId = uuidv4();

  let cart: ICart;

  const cookies = parseCookies(ctx);
  const userCookie = cookies['user'];
  const user = userCookie ? JSON.parse(userCookie) : null;

  const dateParse = Date.parse(user?.date);

  const timeSession = Date.now() - dateParse;

  if(timeSession < 24 * 60 * 60 * 1000 && user?.sessionId && user?.cartId){
    cart = await getCart(user.cartId);
  }else {
    cart = await createCart(newSessionId);
    setCookie(ctx, 'user', JSON.stringify({ sessionId: newSessionId, cartId: cart.id, date: new Date() }), {
      expire: 2 * 24 * 60 * 60,
      path: '/',
    });
  }

  return {
    props: {
      products,
      cart,
    },
  };
};

export default Home;
