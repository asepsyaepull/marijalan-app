import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import useGetAllTransaction from "@/hooks/dashboard/transaksi/useGetAllTransaction";

import UseGetAllUser from "@/hooks/dashboard/user/useGetAllUser";
import useActivity from "@/hooks/useActivity";
import useBanner from "@/hooks/useBanner";
import useCategory from "@/hooks/useCategory";
import usePromo from "@/hooks/usePromo";

import {
  Image,
  Tag,
  LayoutGrid,
  MapPin,
  ShoppingCart,
  AlertCircle,
  Users,
  UserCog,
  Loader2,
} from "lucide-react";

export function Dashboard() {
  const { data: dataBanner, isLoading: isLoadingBanner } = useBanner();

  const { data: dataPromo, isLoading: isLoadingPromo } = usePromo();

  const { data: dataCategory, isLoading: isLoadingCategory } = useCategory();

  const { data: dataActivity, isLoading: isLoadingActivity } = useActivity();

  const { data: dataTransaction, isLoading: isLoadingTransaction } =
    useGetAllTransaction();

  const { data: dataUsers, isLoading: isLoadingUsers } = UseGetAllUser();

  // Hitung transaksi yang perlu konfirmasi (status pending)
  const pendingTransactions =
    dataTransaction?.filter(
      (transaction) => transaction.status.toLowerCase() === "pending"
    )?.length || 0;

  // Hitung jumlah admin (asumsikan roleId === "admin")
  const adminCount =
    dataUsers?.filter((user) => user.role === "admin")?.length || 0;

  // Hitung jumlah user regular
  const userCount =
    dataUsers?.filter((user) => user.role !== "admin")?.length || 0;

  const renderCardContent = (
    label: string,
    count: number,
    isLoading: boolean,
    Icon: any
  ) => (
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <p className="text-2xl font-bold">{count}</p>
          )}
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </CardContent>
  );

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card>
              {renderCardContent(
                "Total Banner",
                dataBanner?.length || 0,
                isLoadingBanner,
                Image
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total Promo",
                dataPromo?.length || 0,
                isLoadingPromo,
                Tag
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total Category",
                dataCategory?.length || 0,
                isLoadingCategory,
                LayoutGrid
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total Activity",
                dataActivity?.length || 0,
                isLoadingActivity,
                MapPin
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total Transaksi",
                dataTransaction?.length || 0,
                isLoadingTransaction,
                ShoppingCart
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Perlu Konfirmasi",
                pendingTransactions,
                isLoadingTransaction,
                AlertCircle
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total User",
                userCount,
                isLoadingUsers,
                Users
              )}
            </Card>

            <Card>
              {renderCardContent(
                "Total Admin",
                adminCount,
                isLoadingUsers,
                UserCog
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
