import { ArrowLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"
import useTransactionsId from "@/hooks/transactions/useGetTransactionsId"
import { useRouter } from "next/router"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from '@/components/ui/card';
import Image from "next/image"
import ProfileSidebar from "../../../components/profileSidebar/profileSidebar"
import OrderCard from "../components/orderCard"
import CancelButton from "./components/cancelButton"
import UploadProofPaymentDialog from "./components/uploadProof"
import { useState } from "react"
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

export default function OrderDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, error } = useTransactionsId(id as string);
    const [selectedTransactionId, setSelectedTransactionId] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const breadcrumbItems = useBreadcrumb();

    const handleBack = () => {
        router.back();
    };

    const handleUploadClick = (transactionId: string) => {
        setSelectedTransactionId(transactionId);
        setIsDialogOpen(true);
    };

    const handleCopy = () => {
        if (data) {
            navigator.clipboard.writeText(data.payment_method.virtual_account_number);
            alert("Account number copied to clipboard");
        }
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1">
                                <Skeleton className="h-64 w-full" />
                            </div>
                            <main className="lg:col-span-3 space-y-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-8 w-48" />
                                </div>
                                <Card className="p-6 space-y-6">
                                    <Skeleton className="h-40 w-full" />
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-20 w-full" />
                                </Card>
                            </main>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) return <div>Error loading order data</div>;

    if (!data) return <div>Order Data not Found</div>;

    const totalPayment = data.transaction_items.reduce((acc, item) => acc + (item.quantity * item.price_discount), 0);
    const isPending = data.status.toLowerCase() === "pending";
    const hasUploadedProof = !!data.proofPaymentUrl;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                {/* Breadcrumb */}
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="hidden md:block lg:col-span-1">
                            <ProfileSidebar />
                        </div>

                        {/* Main Content */}
                        <main className="lg:col-span-3 space-y-6">
                            {/* Header */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
                                    <ArrowLeft className="h-6 w-6" />
                                </Button>
                                <h1 className="text-xl font-semibold">Order Details</h1>
                            </div>

                            {/* Order Details */}
                            <Card className="p-6 space-y-6">
                                {/* Order Card */}
                                <OrderCard id={data.id} />

                                {/* Transfer Details */}
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">Transfer to</h2>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Image src={data.payment_method.imageUrl} alt={data.payment_method.name} width={40} height={40} className="rounded" />
                                                <span className="font-medium">{data.payment_method.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                            <span className="font-mono text-lg">{data.payment_method.virtual_account_number}</span>
                                            <Button variant="secondary" size="sm" onClick={handleCopy}>
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
                                        <span className="text-xl font-semibold">Rp{totalPayment.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    {/* Payment Proof */}
                                    <h2 className="text-lg font-semibold mb-4">Payment Proof</h2>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={imageError ? '/default-image.png' : (data.proofPaymentUrl || '/default-image.png')}
                                                alt="Payment Proof"
                                                fill
                                                className={`object-cover transition-transform ${imageError ? 'object-none bg-gray-100' : ''}`}
                                                onError={() => setImageError(true)}
                                                onClick={handleImageClick}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isPending && !hasUploadedProof && (
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <CancelButton
                                            transactionId={data.id}
                                            invoiceId={data.invoiceId}
                                            className="flex-1" />

                                        <Button
                                            className="flex-1 bg-orange-500 hover:bg-orange-600"
                                            onClick={() => handleUploadClick(data.id)}
                                        >
                                            Upload Payment Proof
                                        </Button>

                                        <UploadProofPaymentDialog
                                            isOpen={isDialogOpen}
                                            onOpenChange={setIsDialogOpen}
                                            transactionId={selectedTransactionId}
                                        />
                                    </div>
                                )}
                            </Card>
                        </main>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {data.proofPaymentUrl && (
                <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                    <DialogOverlay className="fixed inset-0 bg-black/25" />
                    <DialogContent className="bg-white p-6 rounded-lg">
                        <Image
                            src={data.proofPaymentUrl}
                            alt="Uploaded Payment Proof"
                            width={500}
                            height={500}
                            className="object-cover"
                        />
                        <Button onClick={closeImageModal} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </Layout>
    );
}