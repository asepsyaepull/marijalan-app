import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Category {
    id: string;
    name: string;
}
export interface UrlImage {
    url: string;
}

export interface ExperienceItem {
    id: string;
    category: Category;
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
}

const useExperienceId = () => {
    const [data, setData] = useState<ExperienceItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { id } = router.query;

    const getExperienceById = async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${BASE_URL.API}${END_POINT.GET_ACTIVITIES_BY_ID}/${id}`,
                {
                    headers: {
                        apiKey: API_KEY,
                    },
                }
            );
            setData(response.data.data);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "An error occurred while fetching the experience."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (router.isReady && id) {
            getExperienceById(id as string);
        }
    }, [router.isReady, id]);

    return { data, isLoading, error };
};

export default useExperienceId;