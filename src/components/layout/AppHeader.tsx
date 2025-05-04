import { Search, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./UserMenu";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4 lg:gap-6 ml-auto">
        <div className="relative hidden lg:flex w-full max-w-sm items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 bg-slate-50"
          />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}
