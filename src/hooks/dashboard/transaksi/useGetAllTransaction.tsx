import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";

export interface ApiResponse {
  code: string;
  status: string;
  message: string;
  data: TransaksiItem[];
}

export interface TransaksiItem {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: string;
  totalAmount: number;
  proofPaymentUrl?: string;
  orderDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  payment_method: PaymentMethod;
  transaction_items: TransactionItem[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  virtual_account_number: string;
  virtual_account_name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionItem {
  imageUrls: string[];
  id: string;
  transactionId: string;
  title: string;
  description: string;
  price: number;
  price_discount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const fetcher = async (): Promise<TransaksiItem[]> => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.ALL_TRANSACTION}`, {
    headers: {
      apiKey: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const useGetAllTransaction = () => {
  const [data, setData] = useState<TransaksiItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshListTransaction = async () => {
    await fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refreshListTransaction,
  };
};

export default useGetAllTransaction;
