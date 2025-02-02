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
import { XCircle } from "lucide-react";
import UseCancelTransaction from "@/hooks/transactions/useCancelTransaction";

interface CancelTransaksiProps {
  transaksiId: string;
  invoiceId?: string;
}

const CancelTransaksiButton: React.FC<CancelTransaksiProps> = ({
  transaksiId,
  invoiceId,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { cancelTransaction, isLoading } = UseCancelTransaction();

  const handleCancelTransaksi = async () => {
    const success = await cancelTransaction(transaksiId);
    if (success) {
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600"
        onClick={() => setIsAlertOpen(true)}
      >
        Batalkan Transaksi
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancel Transaction</AlertDialogTitle>
            <AlertDialogDescription>
                {invoiceId
                ? `Are you sure you want to cancel the transaction "${invoiceId}"?`
                : "Are you sure you want to cancel the transaction?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleCancelTransaksi}
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Processing..." : "Yes, Cancel Transaction"}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CancelTransaksiButton;
