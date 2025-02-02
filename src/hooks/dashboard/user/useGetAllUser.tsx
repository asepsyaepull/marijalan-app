import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";

export interface UserItem {
  id: string;
  email: string;
  name: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: UserItem[];
}

const UseGetAllUser = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.get<ApiResponse>(`${BASE_URL.API}${END_POINT.GET_ALL_USER}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshUserList = async () => {
    await fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refreshUserList,
  };
};

export default UseGetAllUser;
