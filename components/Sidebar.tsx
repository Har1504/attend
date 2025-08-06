"use client";

import { cn } from "@/lib/utils";
import { useSidebar, SidebarTab } from "@/lib/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, CalendarCheck, CalendarClock, Shield } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/lib/hooks/use-user";

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useSidebar();
  const { data: user } = useUser();

  const tabs = [
    { name: SidebarTab.DASHBOARD, href: "/dashboard", icon: LayoutDashboard },
    { name: SidebarTab.ATTENDANCE, href: "/attendance/logs", icon: CalendarCheck },
    { name: SidebarTab.LEAVE, href: "/leave", icon: CalendarClock },
  ];

  if (user?.role === 'admin') {
    tabs.push({ name: SidebarTab.ADMIN, href: "/admin/leave", icon: Shield });
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 p-4"
      )}
    >
      <div className="mb-4">
        <Link href="/dashboard" className="flex items-center gap-x-2">
          <div className="p-1 bg-white rounded-lg">
            <img src="/file.svg" alt="AttendPro Logo" className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold">AttendPro</h1>
        </Link>
      </div>
      <div className="flex flex-col gap-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            asChild
            variant={activeTab === tab.name ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(tab.name)}
          >
            <Link href={tab.href}>
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};
