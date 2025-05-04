import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LeaveApplication } from "../useLeaveApplications";

export const useLeaveApplicationsList = () => {
  const { data: leaveApplications, isLoading } = useQuery({
    queryKey: ["leaveApplications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leave_applications")
        .select(`
          *,
          employee:employees(id, first_name, last_name),
          leave_type:leave_types(id, name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return {
    leaveApplications,
    isLoading,
  };
};
