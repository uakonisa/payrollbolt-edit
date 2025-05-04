import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Employee, EmploymentDetails } from "@/types/employee";

interface EmployeeDetailsProps {
  employee?: (Employee & { employment_details: EmploymentDetails[] }) | null;
  open: boolean;
  onClose: () => void;
}

export function EmployeeDetails({ employee, open, onClose }: EmployeeDetailsProps) {
  if (!employee) return null;

  // Get first employment detail if available
  const employmentDetail = employee.employment_details?.[0];

  // Format salary with commas and two decimal places
  const formattedSalary = employmentDetail
    ? new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2
      }).format(employmentDetail.basic_salary)
    : "Not available";

  // Generate initials for avatar
  const initials = `${employee.first_name.charAt(0)}${employee.last_name.charAt(0)}`;

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active":
        return "border-green-200 bg-green-50 text-green-700";
      case "On Leave":
        return "border-amber-200 bg-amber-50 text-amber-700";
      case "New":
        return "border-blue-200 bg-blue-50 text-blue-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-700";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Employee Information</DialogTitle>
          <DialogDescription>
            Detailed information about this employee.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col">
          {/* Employee header with avatar */}
          <div className="flex items-center mb-4">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{`${employee.first_name} ${employee.last_name}`}</h3>
              <p className="text-slate-500">{employee.position} • {employee.department}</p>
              <Badge variant="outline" className={getStatusColor(employee.status || "Active")}>
                {employee.status || "Active"}
              </Badge>
            </div>
          </div>

          <Separator className="my-3" />
          
          {/* Personal Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-slate-500 mb-2">CONTACT INFORMATION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-slate-500 mr-2" />
                <span>{employee.email}</span>
              </div>
            </div>
          </div>
          
          {/* Employee Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-slate-500 mb-2">EMPLOYMENT DETAILS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-slate-500 mr-2" />
                <span>Employee ID: {employee.employee_id}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-slate-500 mr-2" />
                <span>Tax Number: {employee.tax_number}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                <span>Start Date: {formatDate(employee.start_date)}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-slate-500 mr-2" />
                <span>ID Number: {employee.id_number}</span>
              </div>
            </div>
          </div>

          {employmentDetail && (
            <>
              {/* Financial Information */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-slate-500 mb-2">FINANCIAL INFORMATION</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Salary: {formattedSalary}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Payment Frequency: {employmentDetail.payment_frequency}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Employment Type: {employmentDetail.employment_type}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Tax Calculation: {employmentDetail.tax_calculation_type}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-slate-500 mb-2">BENEFITS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Badge variant={employmentDetail.medical_aid ? "default" : "outline"} className="mr-2">
                      {employmentDetail.medical_aid ? "Yes" : "No"}
                    </Badge>
                    <span>Medical Aid</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={employmentDetail.retirement_fund ? "default" : "outline"} className="mr-2">
                      {employmentDetail.retirement_fund ? "Yes" : "No"}
                    </Badge>
                    <span>Retirement Fund</span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Banking Information */}
          {employee.bank_name && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-slate-500 mb-2">BANKING DETAILS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                  <span>Bank: {employee.bank_name}</span>
                </div>
                {employee.bank_account_number && (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Account: ••••{employee.bank_account_number.slice(-4)}</span>
                  </div>
                )}
                {employee.bank_branch_code && (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Branch Code: {employee.bank_branch_code}</span>
                  </div>
                )}
                {employee.bank_account_type && (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-slate-500 mr-2" />
                    <span>Account Type: {employee.bank_account_type}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
