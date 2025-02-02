import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import DeleteBannerAlert from "@/hooks/dashboard/banner/deleteBannerAlert";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import useBanner from "@/hooks/useBanner";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// Definisikan interface untuk tipe data banner
interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const BannerDashboard = () => {
  const { data, isLoading, error } = useBanner();

  // Definisikan kolom-kolom untuk tabel
  const columns: ColumnDef<Banner>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            width={144} // Adjust width as needed
            height={80} // Adjust height as needed
            className="object-cover rounded"
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
              <Button size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeleteBannerAlert bannerId={banner.id} />
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
            <h1 className="text-2xl font-bold">Banner Management</h1>
            <Link href="/dashboard/banner/add-banner">
              <Button
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Banner
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

export default BannerDashboard;
