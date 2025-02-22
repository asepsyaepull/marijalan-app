import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useEditActivity from "@/hooks/dashboard/activity/useEditActivity";
import useActivityId from "@/hooks/useActivityId";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import useCategory from "@/hooks/useCategory";
import { Skeleton } from "@/components/ui/skeleton"; 
import Image from "next/image"; 
import { Loader2 } from "lucide-react";

interface FormData {
  categoryId: string;
  title: string;
  description: string;
  imageUrls: string[];
  price: number | string;
  price_discount: string;
  rating: string;
  total_reviews: string;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
  pictureFiles: File[];
}

const EditActivity = () => {
  const router = useRouter();
  const { data: categories, isLoading: isCategoryLoading } = useCategory();
  const { data, isLoading: isLoadingData, error } = useActivityId();
  const { editActivity, handleImagesUpload, isLoading, uploadProgress } =
    useEditActivity();

  const [formData, setFormData] = useState<FormData>({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [],
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    pictureFiles: [],
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      setFormData({
        categoryId: data.category.id || "",
        title: data.title || "",
        description: data.description || "",
        imageUrls: data.imageUrls || [],
        price: data.price || "",
        price_discount: data.price_discount?.toString() || "",
        rating: data.rating?.toString() || "",
        total_reviews: data.total_reviews?.toString() || "",
        facilities: data.facilities || "",
        address: data.address || "",
        province: data.province || "",
        city: data.city || "",
        location_maps: data.location_maps || "",
        pictureFiles: [],
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("Form data:", formData); // Log form data
    
  }, [formData]);

  const formatPrice = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (id === "price" || id === "price_discount") {
      if (isNaN(Number(value.replace(/\./g, "")))) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [id]: formatPrice(value.replace(/\./g, "")),
      }));
    } else if (id === "rating" || id === "total_reviews") {
      if (isNaN(Number(value))) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file sizes
      const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
      if (invalidFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "One or more files exceed the 5MB size limit",
        });
        e.target.value = "";
        return;
      }

      const tempUrls = files.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        pictureFiles: [...prev.pictureFiles, ...files],
        imageUrls: [...prev.imageUrls, ...tempUrls],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const newImageUrls = [...prev.imageUrls];
      const newPictureFiles = [...prev.pictureFiles];

      // Only revoke the URL if it's a blob URL (newly added image)
      if (newImageUrls[index].startsWith("blob:")) {
        URL.revokeObjectURL(newImageUrls[index]);
      }

      newImageUrls.splice(index, 1);
      if (index < newPictureFiles.length) {
        newPictureFiles.splice(index, 1);
      }

      return {
        ...prev,
        imageUrls: newImageUrls,
        pictureFiles: newPictureFiles,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Activity ID is missing",
      });
      return;
    }

    let finalImageUrls = [...formData.imageUrls];

    // Upload new images if any
    if (formData.pictureFiles.length > 0) {
      const uploadedUrls = await handleImagesUpload(formData.pictureFiles);
      if (!uploadedUrls) return;

      // Replace temporary blob URLs with uploaded URLs
      finalImageUrls = formData.imageUrls.map((url) => {
        if (url.startsWith("blob:")) {
          return uploadedUrls.shift() || url;
        }
        return url;
      });
    }

    const success = await editActivity(data.id, {
      ...formData,
      price: formData.price.toString(),
      price_discount: formData.price_discount.toString(),
      rating: formData.rating.toString(),
      total_reviews: formData.total_reviews.toString(),
      imageUrls: finalImageUrls,
    });

    if (success) {
      router.push("/dashboard/activity");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/activity");
  };

  if (!router.isReady || isLoadingData) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500 py-8">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Activity</h1>
          </div>

          <div className="max-w-3xl mx-auto">
            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Activity Preview ${index + 1}`}
                      className="w-full h-[200px] object-cover"
                      width={600}
                      height={400}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "https://placehold.co/600x400/svg";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Continuing from the previous form structure... */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select
                    value={formData.categoryId}
                    onValueChange={handleCategoryChange}
                    disabled={isCategoryLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="images" className="text-right">
                  Images
                </Label>
                <div className="col-span-3">
                  <Input
                    id="images"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="mb-2"
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Max size: 1MB
                  </p>
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
                    placeholder="Enter activity title"
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
                    onChange={handleTextAreaChange}
                    placeholder="Enter activity description"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <div className="col-span-3">
                  <Input
                    id="price"
                    type="text"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price_discount" className="text-right">
                  Discount Price
                </Label>
                <div className="col-span-3">
                  <Input
                    id="price_discount"
                    type="text"
                    value={formData.price_discount}
                    onChange={handleInputChange}
                    placeholder="Enter discount price"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <div className="col-span-3">
                  <Input
                    id="rating"
                    type="text"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="Enter rating (1-5)"
                    min={1}
                    max={5} 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total_reviews" className="text-right">
                  Total Reviews
                </Label>
                <div className="col-span-3">
                  <Input
                    id="total_reviews"
                    type="text"
                    value={formData.total_reviews}
                    onChange={handleInputChange}
                    placeholder="Enter total reviews"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="facilities" className="text-right pt-2">
                  Facilities
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="facilities"
                    value={formData.facilities}
                    onChange={handleTextAreaChange}
                    placeholder="Enter facilities (HTML format supported)"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    HTML format is supported for formatting
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="address" className="text-right pt-2">
                  Address
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={handleTextAreaChange}
                    placeholder="Enter complete address"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="province" className="text-right">
                  Province
                </Label>
                <div className="col-span-3">
                  <Input
                    id="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="Enter province"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <div className="col-span-3">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="location_maps" className="text-right pt-2">
                  Location Maps
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="location_maps"
                    value={formData.location_maps}
                    onChange={handleTextAreaChange}
                    placeholder="Enter Google Maps embed code"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste the Google Maps embed iframe code here
                  </p>
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
                      <span className="animate-spin"><Loader2 /></span>
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

export default EditActivity;
