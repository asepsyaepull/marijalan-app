import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PromoItem } from '@/components/card/promoCard';
import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PromoDetailDialogProps {
    promo: PromoItem | null;
    onClose: () => void;
    open: boolean; // Add open prop to control dialog visibility
}

const PromoDetailDialog: React.FC<PromoDetailDialogProps> = ({ promo, onClose, open }) => {
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [promo]);

    const createMarkup = (htmlContent: string) => {
        return { __html: htmlContent };
    };

    const copyToClipboard = () => {
        if (promo) {
            navigator.clipboard.writeText(promo.promo_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!promo) return null;

    const formatImageUrl = (url: string) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `/${url}`;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] md:max-w-xl w-full max-w-full p-4 sm:p-6 md:p-8 max-h-[80vh] rounded-lg overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-orange-500">{promo.title}</DialogTitle>
                    <div className="relative w-full h-48 mt-4">
                        {loading ? (
                            <Skeleton className="w-full h-full" />
                        ) : (
                            <Image
                                src={imageError ? '/default-image.png' : formatImageUrl(promo.imageUrl)}
                                alt={promo.title}
                                fill
                                className={`object-cover rounded-lg ${imageError ? 'object-none bg-gray-100' : ''}`}
                                onError={() => setImageError(true)}
                                onLoadingComplete={() => setLoading(false)}
                            />
                        )}
                    </div>
                    <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2 sm:mt-4">
                        {promo.description}
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Promo Code</p>
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                            <code className="font-mono text-lg font-bold text-orange-600 dark:text-orange-400">{promo.promo_code}</code>
                            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                                {copied ? "Copied!" : <Copy size={16} />}
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Discount</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                Rp{promo.promo_discount_price.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Minimum Claim</p>
                            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
                                Rp{promo.minimum_claim_price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Terms and Conditions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <div dangerouslySetInnerHTML={createMarkup(promo.terms_condition || '')} />
                        </p>
                    </div>
                </div>
                <DialogClose asChild>
                    <Button variant="outline" className="w-full mt-4 bg-white dark:bg-gray-800">
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default PromoDetailDialog;
