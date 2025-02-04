import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useCategory from "@/hooks/useCategory";
import CategoryTable from "./CategoryTable";

// ...existing code...

const CategoryDashboard = () => {
  const { data, isLoading, error } = useCategory();

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Category Management</h1>
            <Link href="/dashboard/category/add-category">
              <Button className="flex items-center gap-2">
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
              <CategoryTable data={data} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryDashboard;
