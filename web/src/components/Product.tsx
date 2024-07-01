import { IProduct } from "../types/ProductType"
import AddCart from "./AddCart";
import ProductImage from "./Productimage";
import { ButtonAddItem } from "./shared/buttons/ButtonAddItem";

type ProductProps = {
    product: IProduct,
    cartId: number
}
export default function Product({ product, cartId }: ProductProps) {
    return (
        <div className="flex flex-col h-96 p-5 text-black">
            <div className="relative max-h-72 flex-1">
                <ProductImage product={product} fill />

            </div>
            <div className="font-sans my-3 text-center">
                <p className="w-30">{product.name}</p>
                <p className="text-md font-bold">${product.price.toFixed(2)}</p>
            </div>
            <ButtonAddItem cartId={cartId} itemId={product.id} fromCart={false} />
        </div>
    );

}