import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";

interface Activity {
    imageUrls: string[];
    id: string;
    categoryId: string;
    title: string;
    description: string;
    price: number;
    price_discount: number;
    rating: number;
    total_reviews: number;
    facilities: string;
    address: string;
    province: string;
    city: string;
    location_maps: string;
    createdAt: string;
    updatedAt: string;
}

interface CartItem {
    id: string;
    userId: string;
    activityId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    activity: Activity;
}

interface ApiResponse {
    status: string;
    message: string;
    data: CartItem[];
}

const getToken = (): string | null => {
    return (
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1] || null
    );
};

const useGetCart = () => {
    const [data, setData] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        try {
            const token = getToken();
            const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.GET_CART}`, {
                headers: {
                    apiKey: API_KEY,
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "An error occurred");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const refreshCart = async () => {
        setIsLoading(true);
        setError(null);
        await fetchCart();
    };

    return {
        data,
        isLoadingCart: isLoading,
        errorCart: error,
        refreshCart,
    };
};

export default useGetCart;
