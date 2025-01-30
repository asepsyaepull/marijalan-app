import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useState, useEffect } from "react";
import { useToast } from "./use-toast";

interface LoginState {
    role: string | null;
    shouldRedirect: boolean;
}

const useLogin = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loginState, setLoginState] = useState<LoginState>({
        role: null,
        shouldRedirect: false,
    });

    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (loginState.shouldRedirect && loginState.role) {
            const handleRedirect = async () => {
                const path = loginState.role === "admin" ? "/dashboard" : "/";
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a 2-second delay
                await router.push(path);
                window.location.reload();
            };

            handleRedirect();
        }
    }, [loginState, router]);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await axios.post(
                `${BASE_URL.API}${END_POINT.LOGIN}`,
                loginData,
                {
                    headers: {
                        apiKey: API_KEY,
                    },
                }
            );

            const token = response.data?.token;
            const role = response.data?.data.role;

            setCookie("token", token);
            setSuccess(true);
            setError("");

            setLoginState({
                role: role,
                shouldRedirect: true,
            });

            toast({
                title: "Login Successful",
                description: "You have been logged in successfully.",
            });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.message || "An error occurred");

                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: e.response?.data?.message || "An error occurred during login.",
                });
            } else {
                setError("An unexpected error occurred");
            }

            setSuccess(false);
            setLoginState({
                role: null,
                shouldRedirect: false,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        handleLogin,
        success,
    };
};

export default useLogin;
