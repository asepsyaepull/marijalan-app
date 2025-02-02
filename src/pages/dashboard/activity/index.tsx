import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import DeleteActivityAlert from "@/hooks/dashboard/activity/deleteActivityAlert";
import useActivity from "@/hooks/useActivity";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// Define your activity type
interface Activity {
  id: string;
  imageUrls: string[];
  category: {
    name: string;
  };
  title: string;
  city: string;
}

// Define columns
const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "imageUrls",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrls[0];
      return (
        <Image
          src={imageUrl}
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
    header: "Name",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const activity = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Link href={`/dashboard/activity/${activity.id}`}>
            <Button size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteActivityAlert activityId={activity.id} />
        </div>
      );
    },
  },
];

const ActivityDashboard = () => {
  const { data, isLoading, error } = useActivity();

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Activity Management</h1>
            <Link href="/dashboard/activity/add-activity">
              <Button
                className="flex items-center gap-2"
              >
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
          {data && <DataTable columns={columns} data={data} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityDashboard;
