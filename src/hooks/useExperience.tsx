import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

export interface CategoryItem {
    id: string;
    imageUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExperienceItem {
    id: string;
    category: CategoryItem;
    imageUrls: string[];
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

interface ApiResponse {
    status: string;
    message: string;
    data: ExperienceItem[];
}

const useExperience = () => {
    const [data, setData] = useState<ExperienceItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];
            const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.GET_ACTIVITIES}`, {
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
        fetchData();
    }, []);

    const refreshActivity = async () => {
        setIsLoading(true);
        setError(null);
        await fetchData();
    };

    return {
        data,
        isLoading,
        error,
        refreshActivity,
    };
};

export default useExperience;
