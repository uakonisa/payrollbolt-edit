import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEmployees } from "@/hooks/useEmployees";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { EmployeeDetails } from "@/components/employees/EmployeeDetails";
import { EmployeesTable } from "@/components/tables/EmployeesTable";
import { EmployeeSearch } from "@/components/employees/EmployeeSearch";
import { EmployeeBulkActions } from "@/components/employees/EmployeeBulkActions";
import { EmployeePagination } from "@/components/employees/EmployeePagination";
import { toast } from "@/components/ui/sonner";
import { formatCurrency } from "@/utils/formatters";
import type { Employee, EmploymentDetails } from "@/types/employee";

// Define the extended employee type that includes employment details
type EmployeeWithDetails = Employee & { employment_details: EmploymentDetails[] };

const Employees = () => {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const { employees, isLoading, addEmployee, updateEmployee, generateDemoData } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithDetails | null>(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [currentPage] = useState(1);

  const filteredEmployees = employees
    ? employees.filter(emp => {
        if (!searchTerm) return true;
        const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return (
          fullName.includes(searchLower) ||
          emp.position?.toLowerCase().includes(searchLower) ||
          emp.department?.toLowerCase().includes(searchLower) ||
          emp.employee_id?.toLowerCase().includes(searchLower)
        );
      })
    : [];

  const handleAddEmployee = (data: any) => {
    addEmployee.mutate(data);
    setIsAddingEmployee(false);
  };

  const handleUpdateEmployee = (data: any) => {
    if (selectedEmployee) {
      updateEmployee.mutate({
        id: selectedEmployee.id,
        employee: data.employee,
        employmentDetails: data.employmentDetails
      });
      setIsEditingEmployee(false);
      setSelectedEmployee(null);
    }
  };

  const handleBulkAction = (action: string, format?: string) => {
    if (selectedEmployees.length === 0) {
      toast(`Please select at least one employee`, {
        description: "No employees were selected for this action",
      });
      return;
    }
    
    const selectedEmployeeData = employees?.filter(emp => selectedEmployees.includes(emp.id)) || [];
    
    if (action === "Generate IRP5") {
      toast.success(`Generating IRP5 for ${selectedEmployees.length} employee(s)`, {
        description: "The tax certificates will be available for download shortly",
      });
      
      // For demonstration, show what employees were selected
      console.log("Generating IRP5 for employees:", selectedEmployeeData);
      
      // Simulate a delay for generating the documents
      setTimeout(() => {
        toast.success("IRP5 documents ready", {
          description: `${selectedEmployees.length} tax certificates have been generated`,
        });
      }, 2000);
    } 
    else if (action === "Export") {
      const formatName = format === "excel" ? "Excel spreadsheet" : "CSV file";
      
      toast.success(`Exporting ${selectedEmployees.length} employee(s) to ${formatName}`, {
        description: "Your download will begin shortly",
      });
      
      console.log(`Exporting ${selectedEmployees.length} employees to ${format}:`, selectedEmployeeData);
      
      // Create fake downloadable content for demo purposes
      setTimeout(() => {
        const employeeData = selectedEmployeeData.map(emp => {
          // Include basic salary from employment details if available
          const basicSalary = (emp as any).employment_details?.[0]?.basic_salary || 0;
          
          return {
            "Employee ID": emp.employee_id,
            "Name": `${emp.first_name} ${emp.last_name}`,
            "Department": emp.department,
            "Position": emp.position,
            "Status": emp.status,
            "Tax Number": emp.tax_number,
            "Basic Salary": formatCurrency(basicSalary)
          };
        });
        
        console.log("Export data prepared:", employeeData);
        toast.success("Export complete", {
          description: `${selectedEmployees.length} employee records exported to ${formatName}`,
        });
      }, 1500);
    }
  };

  const refreshEmployees = () => {
    toast("Refreshing employee data", {
      description: "Getting the latest employee information"
    });
  };

  // Helper function to ensure employee has employment_details property
  const ensureEmployeeWithDetails = (employee: Employee): EmployeeWithDetails => {
    return {
      ...employee,
      employment_details: (employee as any).employment_details || []
    };
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => generateDemoData.mutate()}
            disabled={generateDemoData.isPending}
          >
            Generate Demo Data
          </Button>
          <Button onClick={() => setIsAddingEmployee(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <EmployeeSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRefresh={refreshEmployees}
            />
            <EmployeeBulkActions 
              selectedEmployees={selectedEmployees}
              onBulkAction={handleBulkAction}
            />
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white">
        <EmployeesTable 
          employees={filteredEmployees}
          selectedIds={selectedEmployees}
          onSelect={setSelectedEmployees}
          onView={(employee) => {
            setSelectedEmployee(ensureEmployeeWithDetails(employee));
            setShowEmployeeDetails(true);
          }}
          onEdit={(employee) => {
            setSelectedEmployee(ensureEmployeeWithDetails(employee));
            setIsEditingEmployee(true);
          }}
          isLoading={isLoading}
        />
        <EmployeePagination 
          total={filteredEmployees.length}
          currentPage={currentPage}
          onPageChange={() => {}}
        />
      </div>

      <EmployeeForm 
        open={isAddingEmployee}
        onClose={() => setIsAddingEmployee(false)}
        onSubmit={handleAddEmployee}
        mode="add"
      />
      
      <EmployeeForm
        open={isEditingEmployee}
        onClose={() => {
          setIsEditingEmployee(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleUpdateEmployee}
        employee={selectedEmployee || undefined}
        mode="edit"
      />

      <EmployeeDetails
        employee={selectedEmployee}
        open={showEmployeeDetails}
        onClose={() => setShowEmployeeDetails(false)}
      />
    </AppLayout>
  );
};

export default Employees;
