import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAddEmployee } from "./useAddEmployee";

export const useGenerateDemoData = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addEmployee } = useAddEmployee();

  return useMutation({
    mutationFn: async () => {
      try {
        // Using the addEmployee mutation to add each demo employee
        // This ensures we go through the same flow as regular employee addition
        const demoEmployees = [
          {
            employee: {
              first_name: "Thilivhali Calvin",
              last_name: "Mulaudzi",
              email: "thilivhali.mulaudzi@example.com",
              position: "Senior Software Engineer",
              department: "Technology",
              employee_id: "EMP001",
              tax_number: "1234567890",
              id_number: "7903036223087",
              bank_name: "Standard Bank",
              bank_account_number: "001234567",
              bank_branch_code: "051001",
              bank_account_type: "Current",
              start_date: "2024-01-15",
              status: "Active"
            },
            employmentDetails: {
              basic_salary: 75000,
              employment_type: "Full-time",
              payment_frequency: "Monthly",
              tax_calculation_type: "PAYE",
              medical_aid: true,
              retirement_fund: true
            }
          },
          {
            employee: {
              first_name: "Sarah",
              last_name: "Johnson",
              email: "sarah.johnson@example.com",
              position: "HR Manager",
              department: "Human Resources",
              employee_id: "EMP002",
              tax_number: "2345678901",
              id_number: "8502154800083",
              bank_name: "FNB",
              bank_account_number: "87654321",
              bank_branch_code: "250655",
              bank_account_type: "Savings",
              start_date: "2023-11-01",
              status: "Active"
            },
            employmentDetails: {
              basic_salary: 65000,
              employment_type: "Full-time",
              payment_frequency: "Monthly",
              tax_calculation_type: "PAYE",
              medical_aid: true,
              retirement_fund: true
            }
          },
          {
            employee: {
              first_name: "John",
              last_name: "Smith",
              email: "john.smith@example.com",
              position: "Sales Representative",
              department: "Sales",
              employee_id: "EMP003",
              tax_number: "3456789012",
              id_number: "9001015800082",
              bank_name: "Nedbank",
              bank_account_number: "11223344",
              bank_branch_code: "198765",
              bank_account_type: "Current",
              start_date: "2024-02-01",
              status: "Active"
            },
            employmentDetails: {
              basic_salary: 45000,
              employment_type: "Full-time",
              payment_frequency: "Monthly",
              tax_calculation_type: "PAYE",
              medical_aid: false,
              retirement_fund: true
            }
          }
        ];

        // Add each demo employee one by one
        const addedEmployees = [];
        for (const demoData of demoEmployees) {
          try {
            // Check if employee with this ID already exists to avoid duplicates
            const { data: existingEmps } = await supabase
              .from("employees")
              .select("id")
              .eq("employee_id", demoData.employee.employee_id);
              
            if (existingEmps && existingEmps.length > 0) {
              console.log(`Employee with ID ${demoData.employee.employee_id} already exists, skipping`);
              continue;
            }
            
            const result = await addEmployee(demoData);
            addedEmployees.push(result);
          } catch (error) {
            console.error(`Error adding demo employee ${demoData.employee.first_name}:`, error);
            // Continue with next employee even if one fails
          }
        }

        return { success: true, count: addedEmployees.length };
      } catch (error: any) {
        console.error("Error generating demo data:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Success",
        description: `${data.count} demo employees have been generated successfully`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
