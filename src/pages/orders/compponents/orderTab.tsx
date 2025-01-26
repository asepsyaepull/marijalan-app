'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const tabs = ['All', 'Waiting', 'Success', 'Canceled', 'Failed'];

type OrderTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export default function OrderTabs({ activeTab, onTabChange, onSearch }: OrderTabsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full md:w-auto">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-4 py-2"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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