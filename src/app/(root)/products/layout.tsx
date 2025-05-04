import FilterSidebar from "@/components/filter/filter-sidebar";
import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container overflow-hidden">
      <SidebarProvider
        className="flex-none shrink-0 items-start"
        style={
          {
            "--sidebar-width": "280px",
          } as React.CSSProperties
        }
      >
        <React.Suspense>
          <FilterSidebar />
        </React.Suspense>
        {children}
      </SidebarProvider>
    </div>
  );
};

export default Layout;
