import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { usePayslipTemplates } from "@/hooks/usePayslipTemplates";
import { usePayslipTemplateActions } from "@/hooks/usePayslipTemplateActions";
import { Skeleton } from "@/components/ui/skeleton";

export const PayslipTemplatesTab = () => {
  const { data: templates, isLoading } = usePayslipTemplates();
  const { isSaving, setDefaultTemplate, previewTemplate, editTemplate } = usePayslipTemplateActions();

  if (isLoading) {
    return <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
      <Skeleton className="h-[600px] w-full" />
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates?.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>
              {template.is_default ? "Default Template" : "Custom Template"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[3/4] bg-slate-50 p-6 border-t flex items-center justify-center">
              <div className="w-full max-w-sm border shadow-sm bg-white p-4">
                <div className="text-center border-b pb-3 mb-3">
                  <h3 className="font-bold text-lg">COMPANY NAME</h3>
                  <p className="text-sm">Standard Payslip</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Employee:</span>
                    <span>John Smith</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID Number:</span>
                    <span>8012085</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pay Period:</span>
                    <span>April 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Date:</span>
                    <span>25/04/2024</span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-2">
                  <div className="grid grid-cols-3 text-xs font-medium">
                    <span>Description</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">YTD</span>
                  </div>
                  <div className="mt-1 grid grid-cols-3 text-xs">
                    <span>Basic Salary</span>
                    <span className="text-right">30,000.00</span>
                    <span className="text-right">120,000.00</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 text-xs font-medium">
                    <span>Deductions</span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mt-1 grid grid-cols-3 text-xs">
                    <span>PAYE</span>
                    <span className="text-right">-6,300.00</span>
                    <span className="text-right">-25,200.00</span>
                  </div>
                  <div className="grid grid-cols-3 text-xs">
                    <span>UIF</span>
                    <span className="text-right">-300.00</span>
                    <span className="text-right">-1,200.00</span>
                  </div>
                  <div className="mt-3 border-t pt-2 grid grid-cols-3 text-xs font-medium">
                    <span>Net Pay:</span>
                    <span className="text-right">R 23,400.00</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => previewTemplate(template.id)}
                disabled={isSaving}
              >
                Preview
              </Button>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => editTemplate(template)}
                  disabled={isSaving}
                >
                  Edit
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setDefaultTemplate(template.id)}
                  disabled={isSaving || template.is_default}
                >
                  {template.is_default ? 'Default Template' : 'Use Template'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="md:col-span-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Custom Payslip Template</CardTitle>
              <CardDescription>Create a new custom payslip template</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg">
              <div className="text-center">
                <PlusCircle className="h-12 w-12 mx-auto text-blue-500" />
                <h3 className="mt-2 text-lg font-medium">Create Custom Template</h3>
                <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
                  Design your own payslip template with custom branding, layout and content
                </p>
                <Button className="mt-4">Start Creating</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
