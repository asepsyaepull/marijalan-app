import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeleteActivityAlert from "@/hooks/dashboard/activity/deleteActivityAlert";
import Image from "next/image";
import { useState } from "react";

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

const ImageCell = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
    const [imgError, setImgError] = useState(false);
    return (
        <Image
            src={imgError ? "/default-image.png" : imageUrl}
            alt={title}
            width={150}
            height={80}
            className="object-cover rounded w-full sm:w-auto"
            onError={() => setImgError(true)}
        />
    );
};

// Define columns
const columns: ColumnDef<Activity>[] = [
    {
        accessorKey: "imageUrls",
        header: "Image",
        cell: ({ row }) => (
            <ImageCell imageUrl={row.original.imageUrls[0]} title={row.original.title} />
        ),
    },
    {
        accessorKey: "title",
        header: "Name",
        cell: ({ row }) => (
            <div className="truncate max-w-xs sm:max-w-none">{row.original.title}</div>
        ),
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
                        <Button
                            variant="outline"
                            className="border-orange-500 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                            size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteActivityAlert activityId={activity.id} />
                </div>
            );
        },
    },
];

const ActivityTable = ({ data }: { data: Activity[] }) => {
    return <DataTable columns={columns} data={data} />;
};

export default ActivityTable;
