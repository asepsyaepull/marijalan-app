import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { toast } from "../use-toast";
import { useRouter } from "next/router";

interface CreateTransactionResponse {
    code: string;
    status: string;
    message: string;
}

const useCreateTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const createTransaction = async (
        cartIds: string[],
        paymentMethodId: string
    ) => {
        try {
            setIsLoading(true);
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const response = await axios.post<CreateTransactionResponse>(
                `${BASE_URL.API}${END_POINT.CREATE_TRANSACTION}`,
                { cartIds, paymentMethodId },
                {
                    headers: {
                        apiKey: API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.code === "200") {
                toast({
                    title: "Success",
                    description: response.data.message,
                });
                router.push("/orders");
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                console.error('Bad Request:', error.response.data);
                toast({
                    title: "Error",
                    description: "Failed to process the transaction. Please check your payment details and try again.",
                    variant: "destructive",
                });
            } else {
                console.error("Error adding to cart:", error);
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { createTransaction, isLoading };
};

export default useCreateTransaction;