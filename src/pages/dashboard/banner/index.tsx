import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import useBanner from "@/hooks/useBanner";
import BannerTable from "./BannerTable";

const BannerDashboard = () => {
  const { data, isLoading, error } = useBanner();

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Banner Management</h1>
            <Link href="/dashboard/banner/add-banner">
              <Button className="flex items-center gap-2">
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
              <BannerTable data={data} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BannerDashboard;
