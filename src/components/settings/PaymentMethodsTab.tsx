import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";

export const PaymentMethodsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Configure payment methods and banking details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Primary Bank Name</Label>
              <Input id="bank-name" defaultValue="First National Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" defaultValue="62123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch-code">Branch Code</Label>
              <Input id="branch-code" defaultValue="250655" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Input id="account-type" defaultValue="Business Current Account" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bank Export Formats</h3>
            
            <div className="flex items-center space-x-2">
              <Switch id="acb-format" defaultChecked />
              <Label htmlFor="acb-format">Enable ACB Tape Format</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="csv-format" defaultChecked />
              <Label htmlFor="csv-format">Enable CSV Format</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="service-id">Service ID (ACB Format)</Label>
                <Input id="service-id" defaultValue="SALARIES" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="generation-number">Generation Number</Label>
                <Input id="generation-number" defaultValue="001" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Approval Workflow</h3>
            
            <div className="flex items-center space-x-2">
              <Switch id="enable-approvals" defaultChecked />
              <Label htmlFor="enable-approvals">Enable Multi-level Approvals</Label>
            </div>
            
            <div className="mt-4">
              <Label>Approval Levels</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center p-3 border rounded-md bg-slate-50">
                  <div className="flex-1">
                    <p className="font-medium">Level 1: Payroll Administrator</p>
                    <p className="text-sm text-slate-500">Initial verification</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-md bg-slate-50">
                  <div className="flex-1">
                    <p className="font-medium">Level 2: Finance Manager</p>
                    <p className="text-sm text-slate-500">Review and approval</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-md bg-slate-50">
                  <div className="flex-1">
                    <p className="font-medium">Level 3: Finance Director</p>
                    <p className="text-sm text-slate-500">Final authorization</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
