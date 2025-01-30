"use client";

import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useToast } from "./use-toast";

const useLogout = () => {
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const reloadPage = () => {
        window.location.reload();
    };

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await axios.get(
                `${BASE_URL.API}${END_POINT.LOGOUT}`,

                {
                    headers: {
                        apiKey: API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.code === "200") {
                setSuccess(true);
                deleteCookie("token");
                toast({
                    title: "Success Logout",
                    description: "You have been logged out successfully.",
                });
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a 2-second delay
                reloadPage();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast({
                    variant: "destructive",
                    title: "Logout Failed",
                    description: err.response?.data?.message || "An error occurred during logout.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Logout Failed",
                    description: "An unexpected error occurred.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleLogout,
        success,
    };
};

export default useLogout;