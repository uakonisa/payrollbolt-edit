import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { AppNavigation } from "./AppNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppSidebar({ sidebarOpen, setSidebarOpen }: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex w-64 flex-col border-r bg-white transition-all duration-300 lg:relative",
        sidebarOpen ? "left-0" : "-left-64 lg:left-0 lg:w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className={cn("flex items-center", !sidebarOpen && "lg:justify-center")}>
          {sidebarOpen ? (
            <div className="text-xl font-bold text-blue-800">ZA-Payroll Pro</div>
          ) : (
            <div className="hidden text-xl font-bold text-blue-800 lg:flex">ZP</div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <AppNavigation sidebarOpen={sidebarOpen} />
      <div className="border-t p-4">
        <div className={cn("flex items-center", !sidebarOpen && "lg:justify-center")}>
          {sidebarOpen ? (
            <div className="text-xs text-slate-500">
              ZA-Payroll Pro v1.0.0
            </div>
          ) : (
            <div className="hidden text-xs text-slate-500 lg:flex">v1</div>
          )}
        </div>
      </div>
    </div>
  );
}
