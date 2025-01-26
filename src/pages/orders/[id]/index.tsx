import Image from "next/image"
import { ArrowLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Layout from "@/components/layout"
import ProfileSidebar from "../compponents/profileSidebar"
import useTransactionsId from "@/hooks/transactions/useGetTransactionsId"
import { useRouter } from "next/router"
import { Skeleton } from "@/components/ui/skeleton"
import { FORMAT_DATE } from "@/helper/convertTime"

export default function OrderDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, error } = useTransactionsId(id as string);

    if (isLoading) return <Skeleton className="w-full h-full" />;
    if (error) return <div>Error loading order data</div>;

    if (!data) return <div>Order not found</div>;

    const { invoiceId, status, totalAmount, payment_method, orderDate, expiredDate, transaction_items } = data;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <div className="max-w-7xl px-4 md:mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div>
                            <ProfileSidebar />
                        </div>

                        {/* Main Content */}
                        <main className="flex-1 p-6">
                            {/* Header */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
                                    <ArrowLeft className="h-6 w-6" />
                                </Button>
                                <h1 className="text-xl font-semibold">Order Details</h1>
                            </div>

                            {/* Order Details */}
                            <Card className="p-6 space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Order items</h2>
                                    <div className="bg-white rounded-lg border p-4">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <Image
                                                src={transaction_items[0].imageUrls[0]}
                                                alt={transaction_items[0].title}
                                                width={200}
                                                height={150}
                                                className="rounded-lg object-cover"
                                            />
                                            <div className="flex-1 space-y-2">
                                                <p className="text-sm text-gray-500">{invoiceId}</p>
                                                <h3 className="text-lg font-semibold">{transaction_items[0].title}</h3>
                                                <p className="text-sm text-gray-500">{FORMAT_DATE(orderDate)}</p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm text-gray-500 line-through">Rp{transaction_items[0].price.toLocaleString()}</p>
                                                        <p className="text-lg font-semibold">{transaction_items[0].quantity} x Rp{totalAmount.toLocaleString()}</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-sm">{status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Transfer Details */}
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Transfer to</h2>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Image src={payment_method.imageUrl} alt={payment_method.name} width={40} height={40} className="rounded" />
                                                <span className="font-medium">{payment_method.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                            <span className="font-mono text-lg">{payment_method.virtual_account_number}</span>
                                            <Button variant="secondary" size="sm">
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Payment */}
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Total Payment</h2>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <span className="text-xl font-semibold">Rp{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button variant="outline" className="flex-1">
                                        Cancel Order
                                    </Button>
                                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Upload Payment Proof</Button>
                                </div>
                            </Card>
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
}