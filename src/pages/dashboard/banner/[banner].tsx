import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import useEditBanner from "@/hooks/dashboard/banner/useEditBanner";
import { toast } from "@/hooks/use-toast";
import useBannerId from "@/hooks/useBannerId";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FormData {
  name: string;
  imageUrl: string | null;
  pictureFile: File | null;
}

const EditBanner = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingData, error } = useBannerId();
  const { editBanner, handleImageUpload, isLoading, uploadProgress } =
    useEditBanner();
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
        description: "Banner ID is missing",
      });
      return;
    }

    let imageUrl = formData.imageUrl;

    if (formData.pictureFile) {
      const uploadedUrl = await handleImageUpload(formData.pictureFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const success = await editBanner(data.id, {
      name: formData.name,
      imageUrl: imageUrl!,
    });

    if (success) {
      router.push("/dashboard/banner");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/banner");
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Banner</h1>
          </div>
          {!router.isReady && <Skeleton className="h-[300px] w-full mb-6" />}
          {isLoadingData ? (
            <Skeleton className="h-[300px] w-full mb-6" />
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="rounded-lg overflow-hidden mb-6">
                <Image
                  src={
                    formData.imageUrl ||
                    data?.imageUrl ||
                    "/default-image.png"
                  }
                  alt={formData.name || data?.name || "Default Banner Name"}
                  className="w-full h-[300px] object-cover"
                  width={600}
                  height={400}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/default-image.png";
                  }}
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter banner name"
                      required
                    />
                  </div>
                </div>

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

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    variant={isLoading ? "ghost" : "outline"}
                    className="text-orange-500 border-orange-500 hover:bg-orange-500/10 hover:text-orange-600"
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
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditBanner;
