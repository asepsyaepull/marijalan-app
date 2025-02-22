import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import useUploadUrlProof from "@/hooks/transactions/useUploadProof";
import UseUploadImage from "@/hooks/useUploadImage";
import Image from 'next/image';

interface UploadProofPaymentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    transactionId: string;
}

interface FormData {
    proofPaymentFile: File | null;
    proofPaymentUrl: string;
}

const UploadProofPaymentDialog = ({
    isOpen,
    onOpenChange,
    transactionId,
}: UploadProofPaymentDialogProps) => {
    const [formData, setFormData] = useState<FormData>({
        proofPaymentFile: null,
        proofPaymentUrl: "",
    });

    const { uploadImage, uploadProgress } = UseUploadImage();
    const { uploadProofPayment, isLoading } = useUploadUrlProof();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > 1 * 1024 * 1024) { // Updated file size limit to 1MB
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "File size should not exceed 1MB",
                });
                e.target.value = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Please upload an image file",
                });
                e.target.value = "";
                return;
            }

            setFormData((prev) => ({
                ...prev,
                proofPaymentFile: file,
                proofPaymentUrl: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.proofPaymentFile) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select an image to upload",
            });
            return;
        }

        try {
            // First upload the image
            const imageUrl = await uploadImage(formData.proofPaymentFile);

            // Then update the transaction with the proof payment URL
            const success = await uploadProofPayment(transactionId, imageUrl);

            if (success) {
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Error uploading proof of payment:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[512px]">
                <AlertDialogHeader>
                    <DialogTitle>Upload Proof of Payment</DialogTitle>
                    <DialogDescription>
                        Please upload your proof of payment image here.
                    </DialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {formData.proofPaymentUrl && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <div className="col-span-4 flex justify-center">
                                    <div className="relative">
                                        <Image
                                            src={formData.proofPaymentUrl}
                                            alt="Proof Payment Preview"
                                            className="w-32 h-32 rounded-lg object-cover"
                                            width={128}
                                            height={128}
                                        />
                                        {uploadProgress > 0 && uploadProgress < 100 && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                <span className="text-white">{uploadProgress}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="proofPayment" className="text-right">
                                Payment Proof
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="proofPayment"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <p className="text-sm text-gray-500 mt-1">Max size: 1MB</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-black"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <span>
                                        {uploadProgress > 0
                                            ? `Uploading... ${uploadProgress}%`
                                            : "Saving..."}
                                    </span>
                                </div>
                            ) : (
                                "Upload Payment Proof"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UploadProofPaymentDialog;