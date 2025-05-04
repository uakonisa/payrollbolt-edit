import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Department {
  id: string;
  name: string;
  description: string | null;
  manager_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select(`
          *,
          manager:employees(id, first_name, last_name)
        `)
        .order("name");

      if (error) throw error;
      return data as (Department & { manager: { id: string; first_name: string; last_name: string; } | null })[];
    },
  });

  const addDepartment = useMutation({
    mutationFn: async (department: Omit<Department, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("departments")
        .insert(department)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success",
        description: "Department added successfully",
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

  return {
    departments,
    isLoading,
    addDepartment,
  };
};
