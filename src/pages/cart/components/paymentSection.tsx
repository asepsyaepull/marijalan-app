'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import usePayment from '@/hooks/payment/usePayment';
import CreateTransaction from './paymentButton';
import { PaymentMethod } from '../../../hooks/transactions/useGetTransactionsId';

type PaymentSectionProps = {
    subtotal: number;
    discount: number;
    total: number;
    refreshCart: () => void;
    selectedItems: string[];
};

export default function PaymentSection({ subtotal, discount, total, refreshCart, selectedItems }: PaymentSectionProps) {
    const { ListPayment: paymentMethods, isLoading, error } = usePayment();
    const [selectedPayment, setSelectedPayment] = useState('');
    const [couponCode, setCouponCode] = useState('');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Payment Information</h2>

            {/* Apply Discount */}
            <div className="space-y-2">
                <h3 className="font-medium">Apply Discount</h3>
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={refreshCart}>Apply</Button>
                </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
                <h3 className="font-medium">Pay With</h3>
                <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="space-y-2"
                >
                    {paymentMethods && paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:border-orange-500 cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value={method.id} id={method.id} />
                                <Label htmlFor={method.id}>{method.name}</Label>
                            </div>
                            <div className="relative w-12 h-8">
                                <Image
                                    src={method.imageUrl}
                                    alt={method.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>Rp{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Promo</span>
                        <span>- Rp{discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total Payment</span>
                        <span className="text-orange-500">Rp{total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {selectedItems.length > 0 &&
                selectedPayment.length > 0 ? (
                <CreateTransaction
                    cartIds={selectedItems}
                    paymentMethodId={selectedPayment}
                />
            ) : (
                <Button
                    variant="default"
                    className="w-full text-white bg-orange-500 hover:bg-orange-600"
                    disabled
                >
                    Select Item dan PaymentMethod
                </Button>
            )}
        </div>
    );
}