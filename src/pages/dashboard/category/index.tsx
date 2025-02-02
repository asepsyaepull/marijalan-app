import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import DeleteCategoryAlert from "@/hooks/dashboard/category/deleteCategoryAlert";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import useCategory from "@/hooks/useCategory";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// Definisikan interface untuk tipe data category
interface Category {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryDashboard = () => {
  const { data, isLoading, error } = useCategory();

  // Definisikan kolom-kolom untuk tabel
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            width={144} // equivalent to w-36
            height={80} // equivalent to h-20
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
        const category = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/dashboard/category/${category.id}`}>
              <Button size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeleteCategoryAlert categoryId={category.id} />
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
            <h1 className="text-2xl font-bold">Category Management</h1>
            <Link href="/dashboard/category/add-category">
              <Button
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
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

export default CategoryDashboard;
