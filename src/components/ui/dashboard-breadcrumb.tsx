"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").slice(1);

  // Build href dynamically
  let accumulatedPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments?.map((item, index) => {
          accumulatedPath += `/${item}`;

          return (
            <React.Fragment key={item}>
              {index === pathSegments.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{item}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink href={accumulatedPath} className="capitalize">
                    {item}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
