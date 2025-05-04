import { Building, Percent, CreditCard, FileText, CalendarDays, UserCog } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SettingsNavigation = () => {
  return (
    <TabsList className="mb-6 w-full justify-start gap-4">
      <TabsTrigger value="company" className="flex items-center">
        <Building className="mr-2 h-4 w-4" />
        Company
      </TabsTrigger>
      <TabsTrigger value="tax" className="flex items-center">
        <Percent className="mr-2 h-4 w-4" />
        Tax Tables
      </TabsTrigger>
      <TabsTrigger value="payment" className="flex items-center">
        <CreditCard className="mr-2 h-4 w-4" />
        Payment Methods
      </TabsTrigger>
      <TabsTrigger value="payslip" className="flex items-center">
        <FileText className="mr-2 h-4 w-4" />
        Payslip Templates
      </TabsTrigger>
      <TabsTrigger value="periods" className="flex items-center">
        <CalendarDays className="mr-2 h-4 w-4" />
        Pay Periods
      </TabsTrigger>
      <TabsTrigger value="users" className="flex items-center">
        <UserCog className="mr-2 h-4 w-4" />
        Users
      </TabsTrigger>
    </TabsList>
  );
};
