import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { toast } from "@/hooks/use-toast";
import useActivity from "@/hooks/useActivity";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  activityId: string;
  onSuccess?: () => void;
}

const DeleteActivityAlert: React.FC<DeleteButtonProps> = ({
  activityId,
  onSuccess,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { refreshActivity } = useActivity();

  const removeItem = async () => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response: { data: { code: string; message?: string; errors?: string } } = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_ACTIVITY}/${activityId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
          data: { activityId },
        }
      );

      if (response.data.code === "200") {
        toast({
          title: "Success",
          description: "Activity has been deleted successfully",
        });
        setIsSuccess(true);
        setIsAlertOpen(false); // Tutup dialog setelah berhasil
        onSuccess?.();
        refreshActivity();
        onSuccess?.();
        window.location.reload(); // Reload the page after successful deletion
        return true;
      }

      toast({
        title: response.data.message || "Failed to delete Activity",
        description: response.data.errors || "Failed to delete Activity",

        variant: "destructive",
      });
      return false;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response?.data.message || "Failed to delete Activity",
          description: error.response?.data?.errors || "Failed to delete Activity",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to delete Activity",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
      return false;
    } finally {
      setIsLoading(false);
      console.log(isSuccess);
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-red-500 bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Activity</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this Activity? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={removeItem}
            disabled={isLoading}
            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Activity
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteActivityAlert;
