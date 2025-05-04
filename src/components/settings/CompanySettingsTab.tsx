import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { useState } from "react";
import { toast } from "sonner";

export const CompanySettingsTab = () => {
  const { settings, saveSettings, isLoading } = useCompanySettings();
  const [formData, setFormData] = useState({
    company_name: settings?.company_name || "",
    registration_number: settings?.registration_number || "",
    vat_number: settings?.vat_number || "",
    paye_reference: settings?.paye_reference || "",
    uif_reference: settings?.uif_reference || "",
    sdl_reference: settings?.sdl_reference || "",
    physical_address: settings?.physical_address || "",
    city: settings?.city || "",
    province: settings?.province || "",
    postal_code: settings?.postal_code || "",
    contact_person: settings?.contact_person || "",
    contact_position: settings?.contact_position || "",
    contact_email: settings?.contact_email || "",
    contact_phone: settings?.contact_phone || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await saveSettings(formData);
      toast.success("Company settings saved successfully");
    } catch (error) {
      toast.error("Failed to save company settings");
      console.error("Error saving settings:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Manage your company details for tax and payroll processing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input 
              id="company_name" 
              value={formData.company_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration_number">Registration Number</Label>
            <Input 
              id="registration_number" 
              value={formData.registration_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vat_number">VAT Number</Label>
            <Input 
              id="vat_number" 
              value={formData.vat_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paye_reference">PAYE Reference Number</Label>
            <Input 
              id="paye_reference" 
              value={formData.paye_reference}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uif_reference">UIF Reference Number</Label>
            <Input 
              id="uif_reference" 
              value={formData.uif_reference}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sdl_reference">SDL Reference Number</Label>
            <Input 
              id="sdl_reference" 
              value={formData.sdl_reference}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="physical_address">Physical Address</Label>
          <Input 
            id="physical_address" 
            value={formData.physical_address}
            onChange={handleInputChange}
          />
          <Input 
            id="city" 
            className="mt-2" 
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <Input 
              id="province"
              value={formData.province}
              onChange={handleInputChange}
              placeholder="Province" 
            />
            <Input 
              id="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              placeholder="Postal Code" 
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="contact_person">Primary Contact Person</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input 
              id="contact_person" 
              value={formData.contact_person}
              onChange={handleInputChange}
              placeholder="Name" 
            />
            <Input 
              id="contact_position"
              value={formData.contact_position}
              onChange={handleInputChange}
              placeholder="Position" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <Input 
              id="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
              placeholder="Email" 
            />
            <Input 
              id="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              placeholder="Phone" 
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
