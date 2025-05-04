import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LeaveType {
  id: string;
  name: string;
  days_allowed: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useLeaveTypes = () => {
  const { data: leaveTypes, isLoading } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leave_types")
        .select()
        .order("name");

      if (error) throw error;
      return data as LeaveType[];
    },
  });

  return {
    leaveTypes,
    isLoading,
  };
};
