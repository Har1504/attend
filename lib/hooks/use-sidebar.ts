import { create } from "zustand";

export enum SidebarTab {
  DASHBOARD = "Dashboard",
  ATTENDANCE = "Attendance",
  LEAVE = "Leave",
  ADMIN = "Admin",
}

interface SidebarStore {
  collapsed: boolean;
  activeTab: SidebarTab;
  onExpand: () => void;
  onCollapse: () => void;
  setActiveTab: (tab: SidebarTab) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  activeTab: SidebarTab.DASHBOARD,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}));
