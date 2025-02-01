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
import useCreateTransaction from "@/hooks/cart/useCreateTransaction";

interface CreateTransactionProps {
    cartIds: string[];
    paymentMethodId: string;
    className?: string;
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({
    cartIds,
    paymentMethodId,
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { createTransaction, isLoading } = useCreateTransaction();

    const handleCreateTransaction = async () => {
        const success = await createTransaction(cartIds, paymentMethodId);
        if (success) {
            setIsAlertOpen(false);
        }
    };

    return (
        <>
            <Button className="w-full" onClick={() => setIsAlertOpen(true)}>
                Proceed to Payment
            </Button>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Proceed to Checkout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to proceed with the payment?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCreateTransaction}
                            disabled={isLoading}
                            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {isLoading ? "Processing..." : "Proceed to Payment"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default CreateTransaction;
