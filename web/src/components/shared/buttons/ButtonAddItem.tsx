import { useOpen } from "@/contexts/OpenContext";
import { addProductCart } from "@/services/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ButtonAddItem = ({ cartId, itemId, fromCart }: { cartId: number, itemId: string, fromCart: boolean }) => {

    const queryClient = useQueryClient();

    const {open, setOpen} = useOpen();

    const mutationAdd = useMutation({
        mutationFn: addProductCart,
        mutationKey: ["addProductCart"]
    })

    const handleUpdate = async (cartId: number, productId: string) => {
        try {
            await mutationAdd.mutateAsync({ cartId, productId })
            queryClient.invalidateQueries({ queryKey: ["getCart"] })
            setOpen(true);
        } catch (error) {
            console.log(error)
        }

    };

    if (fromCart) {
        return (<button onClick={() => handleUpdate(cartId, itemId)} className="px-2">+</button>);
    } else {
        return (<button onClick={() => handleUpdate(cartId, itemId)} className="justify-center text-white bg-emerald-800 hover:bg-emerald-600 font-medium text-sm px-10 py-2.5 text-center inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ADD TO CART
        </button>);
    }
}