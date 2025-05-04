import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CompanySettingsTab } from "@/components/settings/CompanySettingsTab";
import { TaxTablesTab } from "@/components/settings/TaxTablesTab";
import { PaymentMethodsTab } from "@/components/settings/PaymentMethodsTab";
import { PayslipTemplatesTab } from "@/components/settings/PayslipTemplatesTab";
import { PayPeriodsTab } from "@/components/settings/PayPeriodsTab";
import { UsersTab } from "@/components/settings/UsersTab";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Each tab will handle its own save logic through its form submission
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: "There was a problem saving your changes.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  return (
    <AppLayout>
      <SettingsLayout onSave={handleSave} isSaving={isSaving}>
        <Tabs defaultValue="company" onValueChange={setActiveTab}>
          <SettingsNavigation />
          
          <TabsContent value="company">
            <CompanySettingsTab />
          </TabsContent>

          <TabsContent value="tax">
            <TaxTablesTab />
          </TabsContent>

          <TabsContent value="payment">
            <PaymentMethodsTab />
          </TabsContent>

          <TabsContent value="payslip">
            <PayslipTemplatesTab />
          </TabsContent>

          <TabsContent value="periods">
            <PayPeriodsTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
        </Tabs>
      </SettingsLayout>
    </AppLayout>
  );
};

export default Settings;
