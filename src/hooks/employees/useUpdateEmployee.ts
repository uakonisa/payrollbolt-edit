import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Employee, EmploymentDetails } from "@/types/employee";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      employee, 
      employmentDetails 
    }: { 
      id: string;
      employee: Omit<Employee, "id">;
      employmentDetails: Omit<EmploymentDetails, "id" | "employee_id">;
    }) => {
      try {
        console.log("Updating employee:", id, employee);
        
        // Ensure tax_number is not undefined
        const employeeToUpdate = {
          ...employee,
          tax_number: employee.tax_number || ""
        };
        
        // Update the employee data
        const { error: employeeError } = await supabase
          .from("employees")
          .update(employeeToUpdate)
          .eq("id", id);

        if (employeeError) {
          console.error("Error updating employee:", employeeError);
          throw new Error(employeeError.message || "Failed to update employee");
        }

        // Get the employment details id
        const { data: existingDetails, error: fetchError } = await supabase
          .from("employment_details")
          .select("id")
          .eq("employee_id", id)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("Error fetching employment details:", fetchError);
          throw new Error(fetchError.message || "Failed to fetch employment details");
        }

        // Update or insert employment details
        if (existingDetails) {
          const { error: detailsError } = await supabase
            .from("employment_details")
            .update({
              ...employmentDetails,
              employee_id: id
            })
            .eq("id", existingDetails.id);

          if (detailsError) {
            console.error("Error updating employment details:", detailsError);
            throw new Error(detailsError.message || "Failed to update employment details");
          }
        } else {
          const { error: detailsError } = await supabase
            .from("employment_details")
            .insert({
              ...employmentDetails,
              employee_id: id
            });

          if (detailsError) {
            console.error("Error inserting employment details:", detailsError);
            throw new Error(detailsError.message || "Failed to insert employment details");
          }
        }

        return id;
      } catch (error: any) {
        console.error("Error in updateEmployee mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update employee",
        variant: "destructive",
      });
    },
  });
};
