import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useEditCategory from "@/hooks/dashboard/category/useEditCategory";
import { toast } from "@/hooks/use-toast";
import useCaregoryId from "@/hooks/useCategoryId";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FormData {
  name: string;
  imageUrl: string | null;
  pictureFile: File | null;
}

const EditCategory = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingData, error } = useCaregoryId();
  const { editCategory, handleImageUpload, isLoading, uploadProgress } =
    useEditCategory();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: null,
    pictureFile: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        imageUrl: data.imageUrl || null,
        pictureFile: null,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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
        description: "Category ID is missing",
      });
      return;
    }

    let imageUrl = formData.imageUrl;

    if (formData.pictureFile) {
      const uploadedUrl = await handleImageUpload(formData.pictureFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const success = await editCategory(data.id, {
      name: formData.name,
      imageUrl: imageUrl!,
    });

    if (success) {
      router.push("/dashboard/category");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/category");
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Category</h1>
          </div>
          {!router.isReady && <Skeleton />}
          {isLoadingData && <Skeleton />}
          {error && (
            <div className="text-center text-red-500 py-8">{error}</div>
          )}

          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full mb-6" />
            ) : (
              <div className="rounded-lg overflow-hidden mb-6">
                <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                  <Image
                    src={
                      formData.imageUrl ||
                      data?.imageUrl ||
                      "https://placehold.co/600x400/svg"
                    }
                    alt={formData.name || data?.name || "Category Image"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "https://placehold.co/600x400/svg";
                    }}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Category name"
                      required
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="picture" className="text-right">
                  Picture
                </Label>
                <div className="col-span-3">
                  {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <>
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
                    </>
                  )}
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
      </div>
    </DashboardLayout>
  );
};

export default EditCategory;
