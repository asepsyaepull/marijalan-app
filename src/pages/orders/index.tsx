'use client';

import { useState } from 'react';
import OrderTabs from './compponents/orderTab';
import ProfileSidebar from './compponents/profileSidebar';
import OrderCard from './compponents/orderCard';
import useGetTransactions from '@/hooks/transactions/useGetTransactions';
import Layout from '@/components/layout';

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, error } = useGetTransactions();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    const filteredOrders = data.filter(order => {
        const matchesTab = activeTab === 'All' || order.status === activeTab;
        const matchesSearch = order.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <div className="max-w-7xl px-4 md:mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div>
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