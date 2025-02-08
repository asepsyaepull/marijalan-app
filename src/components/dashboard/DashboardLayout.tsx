import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { ReactNode, JSX } from "react";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps): JSX.Element => {
  const breadcrumbItems = useBreadcrumb();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sm:h-20 sm:gap-4">
          <div className="flex items-center gap-2 px-4 sm:gap-4 sm:px-6">
            <SidebarTrigger className="-ml-1 text-black sm:-ml-2" />
            <Separator orientation="vertical" className="mr-2 h-4 sm:mr-4 sm:h-6" />
            <CustomBreadcrumb items={breadcrumbItems} className="flex" />
          </div>
        </header>
        <div className="p-4 sm:p-6">
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
