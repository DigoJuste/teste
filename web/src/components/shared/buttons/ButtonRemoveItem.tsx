import { removeProductCartQuantity } from "@/services/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ButtonRemoveItem = ({cartId, itemId}: {cartId: number, itemId: string}) => {

    const queryClient = useQueryClient();

    const mutationRemove = useMutation({
        mutationFn: removeProductCartQuantity,
        mutationKey: ["removeProductCart"]
    })

    const handleRemove = async (cartId: number, productId: string) => {
        try {
            await mutationRemove.mutateAsync({ cartId, productId })
            queryClient.invalidateQueries({ queryKey: ["getCart"] })
        } catch (error) {
            //tratar erro
        }

    };
    
    return (<button onClick={() => handleRemove(cartId, itemId)} className="px-2">−</button>);
}