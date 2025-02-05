import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { formatToIDR } from "@/helper/convertIDR";
import { FORMAT_DATE } from "@/helper/convertTime";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";

interface Transaksi {
    id: string;
    invoiceId: string;
    payment_method: {
        name: string;
    };
    transaction_items: {
        title: string;
    }[];
    status: string;
    totalAmount: number;
    orderDate: string;
}

const baseColumns: ColumnDef<Transaksi>[] = [
    {
        accessorKey: "invoiceId",
        header: "Invoice ID",
    },
    {
        accessorKey: "transaction_items.title",
        header: "Title",
        cell: ({ row }) => (
            <div className="truncate max-w-[100px]">
                {row.original.transaction_items.map(item => item.title).join(", ")}
            </div>
        ),
    },
    {
        accessorKey: "payment_method.name",
        header: "Payment Method",
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
        cell: ({ row }) => formatToIDR(row.getValue("totalAmount")),
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => FORMAT_DATE(row.getValue("orderDate")),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const transaksi = row.original;
            const isPending = transaksi.status.toLowerCase() === "pending";
            return (
                <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/transaction/${transaksi.id}`}>
                        <Button
                            variant="outline"
                            className={`border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 ${isPending ? '' : 'border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600'}`}
                            size="icon"
                        >
                            {isPending ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    let badgeStyle = "";

    if (status.toLowerCase() === "pending") {
        badgeStyle = "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    } else if (status.toLowerCase() === "success") {
        badgeStyle = "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    } else if (status.toLowerCase() === "cancelled") {
        badgeStyle = "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    } else if (status.toLowerCase() === "failed") {
        badgeStyle = "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    } else {
        badgeStyle = "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"; // default style
    }

    return (
        <Badge className={badgeStyle}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
};

const TransactionTable = ({
    data,
    status,
    isLoading,
}: {
    data: Transaksi[];
    status: string;
    isLoading: boolean;
}) => {
    const filteredData = data.filter(
        (transaction) => transaction.status.toLowerCase() === status.toLowerCase()
    );

    const columns: ColumnDef<Transaksi>[] = [
        ...baseColumns,
    ];

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">
                            {status.charAt(0).toUpperCase() + status.slice(1)} Transactions
                        </CardTitle>
                        <CardDescription>
                            Total: {filteredData.length} transactions
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={filteredData} />
            </CardContent>
        </Card>
    );
};

export default TransactionTable;
