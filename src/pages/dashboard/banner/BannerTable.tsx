import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FORMAT_DATE } from "@/helper/convertTime";
import DeleteBannerAlert from "@/hooks/dashboard/banner/deleteBannerAlert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";

// Definisikan interface untuk tipe data banner
interface Banner {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface BannerTableProps {
    data: Banner[];
}

const BannerTable: React.FC<BannerTableProps> = ({ data }) => {
    // Sort data by updatedAt in descending order
    const sortedData = [...data].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Definisikan kolom-kolom untuk tabel
    const columns: ColumnDef<Banner>[] = [
        {
            accessorKey: "imageUrl",
            header: "Image",
            cell: ({ row }) => {
                const [imgError, setImgError] = useState(false);
                return (
                    <Image
                        src={imgError ? "/default-image.png" : row.original.imageUrl}
                        alt={row.original.name}
                        width={150}
                        height={80}
                        className="object-cover rounded"
                        onError={() => setImgError(true)}
                    />
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue("name")}</span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => FORMAT_DATE(row.getValue("createdAt")),
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => FORMAT_DATE(row.getValue("updatedAt")),
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const banner = row.original;
                return (
                    <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/banner/${banner.id}`}>
                            <Button
                                variant="outline"
                                className="border-orange-500 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                                size="icon"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <DeleteBannerAlert
                            bannerId={banner.id}
                        />
                    </div>
                );
            },
        },
    ];

    return <DataTable columns={columns} data={sortedData} />;
};

export default BannerTable;
