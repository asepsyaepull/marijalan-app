import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useActivity from "@/hooks/useActivity";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityTable from "./ActivityTable";

// ...existing code...

const ActivityDashboard = () => {
  const { data, isLoading, error } = useActivity();

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Activity Management</h1>
            <Link href="/dashboard/activity/add-activity">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </Link>
          </div>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          )}
          {error && <div>{error}</div>}
          {data && <ActivityTable data={data} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityDashboard;
