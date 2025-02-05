'use client';

import { Button } from '@/components/ui/button';

const tabs = ['Pending', 'Success', 'Cancelled', 'Failed'];

type TransactionTabsProps = {
    activeTab: string;
    onTabChange: (value: string) => void;
    onSearch: (value: { invoice: string; title: string }) => void;
};

const TransactionTabs = ({ activeTab, onTabChange, onSearch }: TransactionTabsProps) => {
    const handleSearch = (value: string) => {
        const searchTerms = value.split(' ');
        const searchParams = {
            invoice: searchTerms[0] || '',
            title: searchTerms.slice(1).join(' ') || ''
        };
        onSearch(searchParams);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        variant={activeTab === tab ? 'default' : 'outline'}
                        className={`rounded-full ${activeTab === tab
                            ? 'bg-orange-500 hover:bg-orange-500/90 text-white'
                            : 'hover:bg-orange-500/10 hover:text-orange-500'
                            }`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TransactionTabs;
