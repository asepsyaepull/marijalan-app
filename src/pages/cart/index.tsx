'use client';

import OrderItems from './components/orderItems';
import PaymentSection from './components/paymentSection';
import Layout from '@/components/layout';
import useGetCart from '@/hooks/cart/useGetCart';
import { useState, useEffect } from 'react';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export default function CartPage() {
    const { data: items, errorCart, refreshCart } = useGetCart();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount] = useState(0); // Example discount
    const [total, setTotal] = useState(0);
    const breadcrumbItems = useBreadcrumb();

    useEffect(() => {
        const newSubtotal = items
            .filter(item => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + (item.activity.price * item.quantity), 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal - discount);
    }, [items, selectedItems, discount]);

    if (errorCart) {
        return <div>Error: {errorCart}</div>;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl px-4 md:mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-2 space-y-4">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Order Summary
                            </h1>
                            <OrderItems
                                items={items}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                setSubtotal={setSubtotal}
                                setTotal={setTotal}
                                discount={discount}
                                refreshCart={refreshCart}
                            />
                        </div>

                        {/* Payment Information */}
                        <div>
                            <PaymentSection
                                subtotal={subtotal}
                                discount={discount}
                                total={total}
                                refreshCart={refreshCart}
                                selectedItems={selectedItems}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}