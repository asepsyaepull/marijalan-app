import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import DeletePromoAlert from "@/hooks/dashboard/promo/deletePromoAlert";

// Definisikan interface untuk tipe data promo
interface Promo {
    id: string;
    title: string;
    promo_code: string;
    imageUrl: string;
}

interface PromoContentProps {
    data: Promo[];
}

const ImageCell: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => {
    const [imgError, setImgError] = useState(false);
    return (
        <Image
            src={imgError ? "/default-image.png" : imageUrl}
            alt={title}
            width={150}
            height={80}
            className="object-cover rounded"
            onError={() => setImgError(true)}
        />
    );
};

const PromoTable: React.FC<PromoContentProps> = ({ data }) => {
    // Definisikan kolom-kolom untuk tabel
    const columns: ColumnDef<Promo>[] = [
        {
            accessorKey: "imageUrl",
            header: "Image",
            cell: ({ row }) => (
                <ImageCell imageUrl={row.original.imageUrl} title={row.original.title} />
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "promo_code",
            header: "Promo Code",
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue("promo_code")}</span>
            ),
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const promo = row.original;
                return (
                    <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/promo/${promo.id}`}>
                            <Button
                                variant="outline"
                                className="border-orange-500 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                                size="icon">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <DeletePromoAlert promoId={promo.id} />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Promo Management</h1>
                <Link href="/dashboard/promo/add-promo">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Promo
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    );
};

export default PromoTable;
