"use client";

import Image from "next/image";

import * as React from "react";
import {
  Frame,
  Users,
  ShoppingCart,
  LayoutGrid,
  Tag,
  MapPin,
  ImageMinus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Separator } from "../ui/separator";
import { NavMenus } from "./nav-menus";

// This is sample data.
const data = {
  menus: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Data Banner",
      url: "/dashboard/banner",
      icon: ImageMinus,
    },
    {
      name: "Data Promo",
      url: "/dashboard/promo",
      icon: Tag,
    },
    {
      name: "Data Category",
      url: "/dashboard/category",
      icon: LayoutGrid,
    },
    {
      name: "Data Activity",
      url: "/dashboard/activity",
      icon: MapPin,
    },
    {
      name: "Data Transaksi",
      url: "/dashboard/transaction",
      icon: ShoppingCart,
    },
    {
      name: "Data User",
      url: "/dashboard/users",
      icon: Users,
    },
  ],
};

function handleLogoClick() {
  window.location.href = "/dashboard";
}

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon" {...props}
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}
      {...props}>
      <SidebarHeader>
        <div className="flex p-2 items-center gap-1" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <Image src="/iconLogo.svg" alt="Logo" width={40} height={40} />
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <NavMenus menus={data.menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
