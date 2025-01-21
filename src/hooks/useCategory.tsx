import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";

export interface CategoryItem {
    id: string;
    imageUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    status: string;
    message: string;
    data: CategoryItem[];
}

const useCategory = () => {
    const [data, setData] = useState<CategoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.GET_CATEGORY}`, {
                headers: {
                    apiKey: API_KEY,
                },
            });
            setData(response.data.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const refreshCategory = async () => {
        await fetchCategories();
    };

    return {
        data,
        isLoading,
        error,
        refreshCategory,
    };
};

export default useCategory;
