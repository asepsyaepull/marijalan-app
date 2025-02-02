import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Receipt,
  Clock,
  Calendar,
  AlertCircle,
  User,
  FileText,
  History,
  Image,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import useTransactionsId from "@/hooks/transactions/useGetTransactionsId";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateStatusButton from "@/hooks/dashboard/transaksi/updateStatusTransaction";
import CancelTransaksiButton from "./components/CancelTransaksiButton";
import { useRouter } from 'next/router';

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";

  switch (status.toLowerCase()) {
    case "pending":
      badgeStyle = "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      break;
    case "success":
      badgeStyle = "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      break;
    case "cancelled":
      badgeStyle = "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      break;
    case "failed":
      badgeStyle = "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      break;
    default:
      badgeStyle = "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }

  return <Badge className={badgeStyle}>{status.toUpperCase()}</Badge>;
};

const DetailTransaction = () => {
  const router = useRouter();
  const { transaction } = router.query;
  const { data, isLoading, error } = useTransactionsId(transaction as string);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (event.target as HTMLImageElement).src = "/default-image.png";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col px-4 md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Receipt className="h-4 w-4" />
                <span>{data.invoiceId}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>ID User: {data.userId}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={data.status} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.transaction_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 pb-4 border-b last:border-0"
                  >
                    <img
                      src={item.imageUrls[0] || "/default-image.jpg"}
                      alt={item.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                      onError={handleImageError}
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <span className="text-xs text-gray-600">ID: {item.id}</span>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm">
                          Jumlah:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <h3 className="text-xl text-orange-500 font-semibold">
                            {formatToIDR(item.price)}
                          </h3>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </CardContent>
              <Separator
                className="border-t border-gray-200 dark:border-gray-700"
              />

              {/* Transaction Details Card */}
              <CardHeader>
                <CardTitle>Informasi Transaksi</CardTitle>
              </CardHeader>
              {/* Payment Proof */}
              {data.proofPaymentUrl && (
                <>
                  <div className="flex px-6 py-2 items-center gap-2">
                    <Image className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold">
                      Payment Proof
                    </span>
                  </div>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={data.proofPaymentUrl || "/path/to/default-image.jpg"}
                          alt="Bukti Pembayaran"
                          className="w-32 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onError={handleImageError}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img
                          src={data.proofPaymentUrl || "/path/to/default-image.jpg"}
                          alt="Bukti Pembayaran"
                          className="w-full h-auto"
                          onError={handleImageError}
                        />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </>
              )}
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">
                        Order Date:
                      </span>
                      <span className="text-sm">
                        {FORMAT_DATE(data.orderDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">
                        Expired Date:
                      </span>
                      <span className="text-sm">
                        {FORMAT_DATE(data.expiredDate)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">
                        Create:
                      </span>
                      <span className="text-sm">
                        {FORMAT_DATE(data.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">
                        Updated:
                      </span>
                      <span className="text-sm">
                        {FORMAT_DATE(data.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <img
                    src={data.payment_method.imageUrl}
                    alt={data.payment_method.name}
                    className="h-8 object-contain"
                    onError={handleImageError}
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{data.payment_method.name}</p>
                    <p className="text-sm text-gray-600">
                      Nama Akun: {data.payment_method.virtual_account_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Nomor VA: {data.payment_method.virtual_account_number}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Pembayaran</span>
                  <span className="font-medium text-lg">
                    {formatToIDR(data.totalAmount)}
                  </span>
                </div>

                {data.status === "pending" && (
                  <>
                    <Separator />
                    <UpdateStatusButton
                      transaksiId={data.id}
                      currentStatus={data.status}
                    />
                    <CancelTransaksiButton
                      transaksiId={data.id}
                      invoiceId={data.invoiceId}
                    />
                  </>
                )}
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetailTransaction;
