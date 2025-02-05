'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = ['All', 'Pending', 'Success', 'Cancelled', 'Failed'];

type OrderTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export default function OrderTabs({ activeTab, onTabChange, onSearch }: OrderTabsProps) {
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

      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search here..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}