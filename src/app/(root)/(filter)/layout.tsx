import FilterSidebar from "@/components/templates/filter/filter-sidebar";
import React, { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container min-h-screen py-3">
      <div className="flex gap-10">
        <FilterSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
