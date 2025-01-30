import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import useUploadImage from '@/hooks/useUploadImage'
import axios from 'axios';
import { API_KEY, BASE_URL, END_POINT } from '@/helper/endpoint'
import { useToast } from '@/hooks/use-toast'

const UpdateProfile = () => {
    const { user, refreshUserData } = useUser();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImage } = useUploadImage();

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phoneNumber: string;
        profilePictureUrl: string | null;
        profilePictureFile: File | null;
    }>({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        profilePictureUrl: user?.profilePictureUrl || null,
        profilePictureFile: null,
    });

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

            if (file.size > 5 * 1024 * 1024) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "File size should not exceed 5MB",
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
                profilePictureFile: file,
                profilePictureUrl: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = formData.profilePictureUrl;

            if (formData.profilePictureFile) {
                imageUrl = await uploadImage(formData.profilePictureFile);
            }

            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const updateData = {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                profilePictureUrl: imageUrl || user?.profilePictureUrl,
            };

            const response = await axios.post(
                `${BASE_URL.API}${END_POINT.UPDATE_PROFILE}`,
                updateData,
                {
                    headers: {
                        apiKey: API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.code === "200") {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
                await refreshUserData();
            }
        } catch (err: unknown) {
            const errorMessage = axios.isAxiosError(err) && err.response?.data?.message
                ? err.response.data.message
                : "Failed to update profile";
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Profile Settings Form */}
            <Card className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="space-y-4">
                        <Label>Profile Picture</Label>
                        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
                            <div className="relative">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={formData.profilePictureUrl || "/placeholder.svg"} alt="Profile picture" />
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="profile-picture"
                                    className="absolute bottom-0 right-0 p-1 bg-orange-500 text-white rounded-full cursor-pointer hover:bg-orange-600"
                                >
                                    <Pencil className="h-4 w-4" />
                                </label>
                                <input
                                    type="file"
                                    id="profile-picture"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex-1 space-y-1 text-center sm:text-left">
                                <p className="text-sm font-medium">Upload new photo</p>
                                <p className="text-sm text-gray-500">Your photo should be in PNG or JPG format</p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Personal Information</h2>

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="max-w-md w-full" required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="max-w-md w-full"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="max-w-md w-full"
                                required
                            />

                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button variant="outline" className="flex-1 sm:flex-none sm:min-w-[200px]">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 sm:flex-none sm:min-w-[200px] bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default UpdateProfile