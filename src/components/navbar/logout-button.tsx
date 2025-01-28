import { useEffect, useState } from "react";
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
import { Loader2, LogOut } from "lucide-react";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import useLogout from "@/hooks/useLogout";

interface LogoutButtonProps {

    className?: string;

}

export default function LogoutButton({ className }: LogoutButtonProps) {
    const { isLoading, handleLogout } = useLogout();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleLogoutClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAlertOpen(true);
    };

    const handleConfirmLogout = async () => {
        setIsAlertOpen(false);
        await handleLogout();
    };

    // Ensure modal is closed properly
    useEffect(() => {
        if (!isAlertOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [isAlertOpen]);

    return (
        <>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`flex justify-start items-center gap-3 w-full p-1 rounded-lg dark:hover:bg-gray-700 text-red-600 ${className}`}
                        onClick={handleLogoutClick}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{isLoading ? 'Logging out...' : 'Log out'}</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to log out?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading} onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmLogout}
                            disabled={isLoading}
                            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Logging Out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
