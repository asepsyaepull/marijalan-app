import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import usePromo from "@/hooks/usePromo";
import PromoTable from "./PromoTable";

const PromoDashboard = () => {
  const { data, isLoading, error } = usePromo();

  return (
    <DashboardLayout>
      <div className="p-4">
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
            <PromoTable data={data} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PromoDashboard;
