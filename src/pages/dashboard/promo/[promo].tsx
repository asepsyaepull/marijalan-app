import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useEditPromo from "@/hooks/dashboard/promo/useEditPromo";
import { toast } from "@/hooks/use-toast";
import usePromoId from "@/hooks/usePromoId";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  imageUrl: string | null;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: string;
  minimum_claim_price: string;
  pictureFile: File | null;
}

const EditPromo = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingData, error } = usePromoId();
  const { editPromo, handleImageUpload, isLoading, uploadProgress } =
    useEditPromo();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imageUrl: null,
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
    pictureFile: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        imageUrl: data.imageUrl || null,
        terms_condition: data.terms_condition || "",
        promo_code: data.promo_code || "",
        promo_discount_price: data.promo_discount_price?.toString() || "",
        minimum_claim_price: data.minimum_claim_price?.toString() || "",
        pictureFile: null,
      });
    }
  }, [data]);

  const formatNumberWithPeriods = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === "promo_discount_price" || id === "minimum_claim_price") {
      if (!/^\d*\.?\d*$/.test(value.replace(/\./g, ""))) return; // Ensure only numeric values
      setFormData((prev) => ({
        ...prev,
        [id]: value.replace(/\./g, ""), // Store numeric value without periods
      }));
      e.target.value = formatNumberWithPeriods(value.replace(/\./g, "")); // Format with periods
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 1 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size should not exceed 1MB",
        });
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        pictureFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Promo ID is missing",
      });
      return;
    }

    let imageUrl = formData.imageUrl;

    if (formData.pictureFile) {
      const uploadedUrl = await handleImageUpload(formData.pictureFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const success = await editPromo(data.id, {
      title: formData.title,
      description: formData.description,
      imageUrl: imageUrl!,
      terms_condition: formData.terms_condition,
      promo_code: formData.promo_code,
      promo_discount_price: Number(formData.promo_discount_price),
      minimum_claim_price: Number(formData.minimum_claim_price),
    });

    if (success) {
      router.push("/dashboard/promo");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/promo");
  };

  if (!router.isReady || isLoadingData) return <Skeleton />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <DashboardLayout>
      <div className="p-4">
        {isLoading && (
          <div className="space-y-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-1/4" />
          </div>
        )}
        {!isLoading && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Edit Promo</h1>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-lg overflow-hidden mb-6">
                <Image
                  src={
                    formData.imageUrl ||
                    data?.imageUrl ||
                    "https://placehold.co/600x400/svg"
                  }
                  alt={formData.title || data?.title || "Promo Image"}
                  className="w-full h-[300px] object-cover"
                  width={600}
                  height={400}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "https://placehold.co/600x400/svg";
                  }}
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="picture" className="text-right">
                    Picture
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="picture"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-1">Max size: 1MB</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter promo title"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <div className="col-span-3">
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter promo description"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="terms_condition" className="text-right pt-2">
                    Terms & Conditions
                  </Label>
                  <div className="col-span-3">
                    <Textarea
                      id="terms_condition"
                      value={formData.terms_condition}
                      onChange={handleInputChange}
                      placeholder="Enter terms and conditions"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="promo_code" className="text-right">
                    Promo Code
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="promo_code"
                      value={formData.promo_code}
                      onChange={handleInputChange}
                      placeholder="Enter promo code"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="promo_discount_price" className="text-right">
                    Discount Amount
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="promo_discount_price"
                      type="text"
                      value={formatNumberWithPeriods(formData.promo_discount_price)}
                      onChange={handleInputChange}
                      placeholder="Enter discount amount"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minimum_claim_price" className="text-right">
                    Minimum Purchase
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="minimum_claim_price"
                      type="text"
                      value={formatNumberWithPeriods(formData.minimum_claim_price)}
                      onChange={handleInputChange}
                      placeholder="Enter minimum purchase amount"
                      required
                    />
                  </div>
                </div>


                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-orange-500 border-orange-500 hover:bg-orange-100 hover:text-orange-600"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin">⚪</span>
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditPromo;
