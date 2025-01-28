import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import useDeleteCart from "@/hooks/cart/useDelete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import useGetCart from "@/hooks/cart/useGetCart";

interface DeleteCartButtonProps {
    cartId: string;
    onSuccess?: () => void;
    refreshCart: () => void;
}

const DeleteCartButton: React.FC<DeleteCartButtonProps> = ({
    cartId,
    onSuccess,
    refreshCart,
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { removeItem, isLoading } = useDeleteCart();
    const handleDeleteItem = async () => {
        try {
            await removeItem(cartId);
            setIsAlertOpen(false);
            onSuccess?.();
            refreshCart();
        } catch (error: any) {
            console.error("Failed to delete cart item:", error.message);
            setIsAlertOpen(false);
        }
    };


    return (
        <>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Item from Cart</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this item from your cart? This
                            action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setIsAlertOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteItem} disabled={isLoading}>
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteCartButton;
