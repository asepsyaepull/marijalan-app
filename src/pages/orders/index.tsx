'use client';

import { useState } from 'react';
import OrderTabs from './components/orderTab';
import OrderCard from './components/orderCard';
import useGetTransactions from '@/hooks/transactions/useGetTransactions';
import Layout from '@/components/layout';
import ProfileSidebar from '@/components/profileSidebar/profileSidebar';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, error } = useGetTransactions();
    const breadcrumbItems = useBreadcrumb();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    const searchOrders = (orders: Array<{ invoiceId: string; status: string; id: string; transaction_items: Array<{ title: string }> }>) => {
        return orders.filter(
            (order: { invoiceId: string; transaction_items: Array<{ title: string }> }) =>
                order.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.transaction_items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const filteredOrders = activeTab === 'All'
        ? searchOrders(data)
        : searchOrders(data).filter(order => order.status.toLowerCase() === activeTab.toLowerCase());

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                {/* Breadcrumb */}
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl px-4 md:mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className='hidden lg:block lg:col-span-1'>
                            <ProfileSidebar />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Your Orders
                            </h1>

                            <OrderTabs
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                onSearch={setSearchQuery}
                            />

                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        id={order.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}