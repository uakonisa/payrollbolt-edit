import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface AppNavigationProps {
  sidebarOpen: boolean;
}

export function AppNavigation({ sidebarOpen }: AppNavigationProps) {
  const navigate = useNavigate();
  
  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Employees",
      icon: Users,
      path: "/employees",
    },
    {
      name: "Payroll Runs",
      icon: CalendarDays,
      path: "/payroll-runs",
    },
    {
      name: "Reports & Exports",
      icon: FileText,
      path: "/reports",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/payments",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <nav className="flex-1 overflow-auto py-4">
      <ul className="space-y-1 px-2">
        {navigationItems.map((item) => (
          <li key={item.name}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                !sidebarOpen && "lg:justify-center"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={cn("h-5 w-5", !sidebarOpen && "lg:mr-0")} />
              <span className={cn("ml-2", !sidebarOpen && "lg:hidden")}>
                {item.name}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
