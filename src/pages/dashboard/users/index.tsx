import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UseGetAllUser from "@/hooks/dashboard/user/useGetAllUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UseUpdateRole from "@/hooks/dashboard/user/useUpdateRole";
import UpdateRoleDialog from "./components/UpdateRoleDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image"; // Import Image component

const ITEMS_PER_PAGE = 10;

const UsersDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateUserRole = UseUpdateRole();

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedUserId) return;

    setIsLoading(true);
    const success = await updateUserRole(selectedUserId, { role: newRole });

    if (success) {
      setIsUpdateDialogOpen(false);
      refreshUserList();
    }

    setIsLoading(false);
  };

  const { data, isLoading, error, refreshUserList } = UseGetAllUser();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data
    ? data.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const totalPages = filteredData ? Math.ceil(filteredData.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="space-y-4">
          <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <h1 className="text-2xl font-bold">User Management</h1>
            {/* Search Input */}
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8"
              />
            </div>
          </div>
          {isLoading && <Skeleton />}
          {error && <Skeleton />}
          {!isLoading && !error && (
            <div className="space-y-4 rounded-md border max-w-sm md:max-w-full overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nomor Hp</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length ? (
                    currentData.map((userList) => (
                      <TableRow key={userList.id}>
                        <TableCell>
                          <Image
                            src={
                              userList.profilePictureUrl ||
                              "/user-default.jpg"
                            }
                            alt={userList.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-full"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.src = "/user-default.jpg";
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {userList.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {userList.email}
                        </TableCell>
                        <TableCell className="font-medium">
                          {userList.phoneNumber}
                        </TableCell>
                        <TableCell className="font-medium">
                          {userList.role.charAt(0).toUpperCase() + userList.role.slice(1)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <UpdateRoleDialog
                              userId={userList.id}
                              currentRole={userList.role}
                              isLoading={loading && selectedUserId === userList.id}
                              isDialogOpen={
                                isUpdateDialogOpen && selectedUserId === userList.id
                              }
                              setDialogOpen={(open) => {
                                setIsUpdateDialogOpen(open);
                                if (open) {
                                  setSelectedUserId(userList.id);
                                } else {
                                  setSelectedUserId(null);
                                }
                              }}
                              onUpdate={handleUpdateRole}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-600"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-600"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersDashboard;
