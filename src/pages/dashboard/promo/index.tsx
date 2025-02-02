import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import DeletePromoAlert from "@/hooks/dashboard/promo/deletePromoAlert";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import usePromo from "@/hooks/usePromo";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image"; // Import Image component

// Definisikan interface untuk tipe data promo
interface Promo {
  id: string;
  title: string;
  promo_code: string;
  imageUrl: string;
}

const PromoDashboard = () => {
  const { data, isLoading, error } = usePromo();

  // Definisikan kolom-kolom untuk tabel
  const columns: ColumnDef<Promo>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image
            src={row.original.imageUrl}
            alt={row.original.title}
            width={144} // Adjust width as needed
            height={80} // Adjust height as needed
            className="object-cover rounded"
          />
        );
      },
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
              <Button size="icon">
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
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Promo Management</h1>
            <Link href="/dashboard/promo/add-promo">
              <Button
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Promo
              </Button>
            </Link>
          </div>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
          {error && <div>{error}</div>}
          {data && (
            <div className="space-y-4">
              <DataTable columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PromoDashboard;
