import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";

interface PromoItem {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    terms_condition: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
    createdAt: string;
    updatedAt: string;
}


interface ApiResponse {
    status: string;
    message: string;
    data: PromoItem[];
}

const fetchPromoData = async (): Promise<PromoItem[]> => {
    const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.GET_PROMO}`, {
        headers: {
            apiKey: API_KEY,
        },
    });
    return response.data.data;
};

const usePromo = () => {
    const [data, setData] = useState<PromoItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const promoData = await fetchPromoData();
            setData(promoData);
            setError(null);
        } catch (err:any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshPromo = async () => {
        await fetchData();
    };

    return {
        data,
        isLoading,
        error,
        refreshPromo,
    };
};

export default usePromo;
