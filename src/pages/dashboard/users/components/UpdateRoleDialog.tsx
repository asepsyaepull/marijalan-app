import React, { useEffect, useState } from "react";
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
import { Loader2, Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateRoleDialogProps {
  userId: string;
  currentRole: string;
  isLoading: boolean;
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onUpdate: (role: string) => Promise<void>;
}

const UpdateRoleDialog: React.FC<UpdateRoleDialogProps> = ({
  userId,
  currentRole,
  isLoading,
  isDialogOpen,
  setDialogOpen,
  onUpdate,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  // Update selectedRole when currentRole changes
  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  const handleUpdate = async () => {
    await onUpdate(selectedRole);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-600" 
          size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update User Role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to update this user's role from {currentRole} to {selectedRole}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger id={`role-${userId}`} className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpdate}
            disabled={isLoading || selectedRole === currentRole}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Role"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateRoleDialog;
