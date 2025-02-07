import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useToast } from "./use-toast";

const useRegister = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { toast } = useToast(); 

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const password = formData.get("password");
        const passwordRepeat = formData.get("passwordRepeat");

        if (password !== passwordRepeat) {
            setError("Passwords do not match");
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: "Passwords do not match",
            }); 
            setIsLoading(false);
            return;
        }

        const registerData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: password,
            passwordRepeat: passwordRepeat,
            role: formData.get("role"),
            profilePictureUrl:
                "/user-default.jpg",
            phoneNumber: formData.get("phoneNumber"),
        };

        try {
            await axios.post(`${BASE_URL.API}${END_POINT.REGISTER}`, registerData, {
                headers: {
                    apiKey: API_KEY,
                },
            });

            setSuccess(true);
            setError("");
            toast({
                title: "Registration Successful",
                description: "You have been registered successfully.",
            });
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (e: any) {
            setSuccess(false);
            const errorMessage = e.response?.data?.message ||
                e.response?.data?.errors[0]?.message ||
                "An error occurred";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: errorMessage,
            }); // Show error toast
        } finally {
            setIsLoading(false);
        }
    };

    return {
        success,
        error,
        isLoading,
        handleRegister,
    };
};

export default useRegister;
