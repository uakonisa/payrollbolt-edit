import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useEmployeesList = () => {
  const { data: employees, isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        console.log("Fetching employees data...");
        const { data, error } = await supabase
          .from("employees")
          .select(`
            *,
            employment_details (*)
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching employees:", error);
          throw error;
        }
        
        console.log("Employees fetched successfully:", data?.length || 0, "records");
        return data;
      } catch (err) {
        console.error("Error in useEmployeesList:", err);
        throw err;
      }
    },
  });

  const getEmployee = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select(`
          *,
          employment_details (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error getting employee by ID:", err);
      throw err;
    }
  };

  return {
    employees,
    isLoading,
    refetch,
    getEmployee,
  };
};
