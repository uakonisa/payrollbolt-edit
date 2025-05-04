import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Employee, EmploymentDetails } from "@/types/employee";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employee, employmentDetails }: { 
      employee: Omit<Employee, "id">, 
      employmentDetails: Omit<EmploymentDetails, "id" | "employee_id">
    }) => {
      try {
        // Log the employee data to help with debugging
        console.log("Adding employee:", employee);
        
        // Ensure tax_number is not undefined (empty string is okay)
        const employeeToInsert = {
          ...employee,
          tax_number: employee.tax_number || ""
        };
        
        // Add validation for required fields
        if (!employeeToInsert.first_name || !employeeToInsert.last_name || 
            !employeeToInsert.email || !employeeToInsert.id_number) {
          throw new Error("Missing required employee information");
        }
        
        // Insert the employee data
        const { data: newEmployee, error: employeeError } = await supabase
          .from("employees")
          .insert(employeeToInsert)
          .select()
          .single();

        if (employeeError) {
          console.error("Error adding employee:", employeeError);
          throw new Error(employeeError.message || "Failed to add employee");
        }

        console.log("Employee added successfully:", newEmployee);

        // Insert employment details with the new employee ID
        const { error: detailsError } = await supabase
          .from("employment_details")
          .insert({
            ...employmentDetails,
            employee_id: newEmployee.id
          });

        if (detailsError) {
          console.error("Error adding employment details:", detailsError);
          
          // If we fail to add employment details, remove the employee to maintain consistency
          await supabase.from("employees").delete().eq('id', newEmployee.id);
          
          throw new Error(detailsError.message || "Failed to add employment details");
        }

        return newEmployee;
      } catch (error: any) {
        console.error("Error in addEmployee mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Success",
        description: "Employee added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add employee",
        variant: "destructive",
      });
    },
  });
};
