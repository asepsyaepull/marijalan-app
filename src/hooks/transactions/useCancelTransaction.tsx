import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { toast } from "../use-toast";

interface CancelTrasanctionResponse {
    code: string;
    status: string;
    message: string;
}

const UseCancelTransaction = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cancelTransaction = async (transactionId: string) => {
        try {
            setIsLoading(true);
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const response = await axios.post<CancelTrasanctionResponse>(
                `${BASE_URL.API}${END_POINT.CANCEL_TRANSACTION}/${transactionId}`,
                {},
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
                window.location.reload();
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast({
                title: "Error",
                description: "Something went wrong",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    return { cancelTransaction, isLoading };
};

export default UseCancelTransaction;
