"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/customer-context";
import { Sidebar, type DashboardTab } from "@/components/dashboard/sidebar";
import { OverviewTab } from "@/components/dashboard/overview-tab";
import { OrdersTab } from "@/components/dashboard/orders-tab";
import { DownloadsTab } from "@/components/dashboard/downloads-tab";
import { ProfileTab } from "@/components/dashboard/profile-tab";
import { SupportTab } from "@/components/dashboard/support-tab";
import { DashboardCursor } from "@/components/DashboardCursor";

// Mappa delle tab
const TAB_COMPONENTS: Record<DashboardTab, React.ComponentType> = {
  overview: OverviewTab,
  orders: OrdersTab,
  downloads: DownloadsTab,
  profile: ProfileTab,
  support: SupportTab,
};

export default function DashboardPage() {
  const router = useRouter();
  const { customer, isLoading } = useCustomer();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  // Reindirizzamento se non loggato
  useEffect(() => {
    if (!isLoading && !customer) {
      router.push("/login");
    }
  }, [customer, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <>
      {/* Cursore specifico per la dashboard */}
      <DashboardCursor />
      {/* Layout principale della dashboard */}
      <div className="flex min-h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <ActiveTabComponent />
          </div>
        </main>
      </div>
    </>
  );
}