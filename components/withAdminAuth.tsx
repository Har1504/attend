// app/components/withAdminAuth.tsx
"use client";

import { useUser } from "@/lib/hooks/use-user";
import { ComponentType } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function withAdminAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AdminAuth = (props: P) => {
    const { data: user, isLoading, isError } = useUser();

    if (isLoading) {
      return (
        <div className="container mx-auto py-10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      );
    }

    if (isError || user?.role !== 'admin') {
      return (
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold text-destructive">Not Authorized</h1>
          <p className="text-muted-foreground">You do not have permission to view this page.</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
  return AdminAuth;
}
