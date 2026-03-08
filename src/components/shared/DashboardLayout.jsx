import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { AppHeader } from "@/components/shared/sidebar/app-header";
import BreadCrumb from "./BreadCrumb";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <BreadCrumb />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}