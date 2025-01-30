import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

export interface BannerItem {
    id: string;
    imageUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const useBanner = () => {
    const [data, setData] = useState<BannerItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBanners = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${BASE_URL.API}${END_POINT.GET_BANNER}`, // Update this line if the endpoint changes
                {
                    headers: {
                        apiKey: API_KEY,
                    },
                }
            );
            setData(response.data.data);
        } catch (error: unknown) { // Update the type of error to unknown
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                    "An error occurred while fetching banners."
                );
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return { data, isLoading, error, refreshBanner: fetchBanners };
};

export default useBanner;
