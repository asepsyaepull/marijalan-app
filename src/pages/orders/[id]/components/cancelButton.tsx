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
import { Loader2 } from "lucide-react";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import UseCancelTransaction from "@/hooks/transactions/useCancelTransaction";

interface CancelButtonProps {
    transactionId: string;
    invoiceId: string
    className?: string;

}

export default function CancelButton({ transactionId, className }: CancelButtonProps) {
    const { cancelTransaction, isLoading } = UseCancelTransaction();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handlCancelClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAlertOpen(true);
    };

    const handleConfirmCancel = async () => {
        setIsAlertOpen(false);
        await cancelTransaction(transactionId);
    };

    return (
        <>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className={`flex items-center gap-3 w-full p-1 rounded-lg dark:hover:bg-gray-700 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-400 ${className}`}
                        onClick={handlCancelClick}
                    >
                        <span>{isLoading ? 'Canceling...' : 'Cancel Transaction'}</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Cancel Transaction</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to Cancel Transaction?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmCancel}
                            disabled={isLoading}
                            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Canceling Transaction...
                                </>
                            ) : (
                                <>
                                    Cancel Transaction
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
