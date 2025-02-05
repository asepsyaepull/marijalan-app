import React, { useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import useGetAllTransaction from "@/hooks/dashboard/transaksi/useGetAllTransaction";
import TransactionTable from "./TransactionTable";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionTabs from "./TransactionTabs";

interface Transaksi {
  status: string;
  orderDate: string; 
}

const TransaksiDashboard = () => {
  const { data, isLoading, error } = useGetAllTransaction();
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState<{ invoice: string; title: string }>({ invoice: "", title: "" });

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a: Transaksi, b: Transaksi) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }, [data]);

  const filteredData = useMemo(() => {
    return sortedData.filter((t: Transaksi) =>
      t.status.toLowerCase().includes(activeTab.toLowerCase()) &&
      (t.orderDate.toLowerCase().includes(searchQuery.invoice.toLowerCase()) || t.orderDate.toLowerCase().includes(searchQuery.title.toLowerCase()))
    );
  }, [sortedData, activeTab, searchQuery]);

  const getFilteredDataByStatus = (status: string) => {
    return filteredData.filter((t: Transaksi) => t.status.toLowerCase() === status);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <Card className="bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error</CardTitle>
              <CardDescription className="text-red-600">
                {error}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <div className="mb-6 ">
          <h1 className="text-2xl font-bold">Transaction Management</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all transactions across different statuses
          </p>
        </div>

        <TransactionTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSearch={(value) => setSearchQuery(value)}
        />

        <Tabs
          defaultValue={activeTab.toLowerCase()}
          value={activeTab.toLowerCase()}
          onValueChange={(value) => setActiveTab(value)}
          className="space-y-4"
        >
          <TabsContent value="pending">
            <TransactionTable
              data={getFilteredDataByStatus("pending")}
              status="pending"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="success">
            <TransactionTable
              data={getFilteredDataByStatus("success")}
              status="success"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <TransactionTable
              data={getFilteredDataByStatus("cancelled")}
              status="cancelled"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="failed">
            <TransactionTable
              data={getFilteredDataByStatus("failed")}
              status="failed"
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TransaksiDashboard;
