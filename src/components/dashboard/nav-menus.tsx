"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuProps {
  menus: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavMenus({ menus }: MenuProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Menu
      </SidebarGroupLabel>

      <SidebarMenu className="mt-2 space-y-1">
        {menus.map((item) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={`
                  w-full h-10 group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-orange-100 text-orange-500 hover:text-orange-600 hover:bg-orange-100 dark:bg-orange-900/50 dark:text-orange-300'
                  : 'text-gray-700 hover:bg-orange-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <Icon className={`
                    w-5 h-5 shrink-0 transition-colors
                    ${isActive
                      ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-500 hover:text-orange-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }
                  `} />
                  <span className="truncate">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}