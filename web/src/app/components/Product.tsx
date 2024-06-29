import { ProductType } from "../types/ProductType"
import ProductImage from "./Productimage";

type ProductProps = {
    product: ProductType
}
export default function Product({ product }: ProductProps) {
    return (
        <div className="flex flex-col h-96 p-5 text-black">
            <div className="relative max-h-72 flex-1">
                <ProductImage product={product} fill />

            </div>
            <div className="font-sans my-3 text-center">
                <p className="w-30">{product.name}</p>
                <p className="text-md font-bold">${product.price}</p>
            </div>
            <button className="font-mono bg-emerald-800 text-white p-10.5 py-2.5 text-sm text-center uppercase">add to cart</button>
        </div>
    );

}