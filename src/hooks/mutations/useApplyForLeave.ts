import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { LeaveApplication } from "../useLeaveApplications";

export const useApplyForLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: Omit<LeaveApplication, "id" | "status" | "workflow_stage" | "created_at" | "updated_at">) => {
      const { data: newApplication, error: applicationError } = await supabase
        .from("leave_applications")
        .insert(application)
        .select()
        .single();

      if (applicationError) throw applicationError;

      // Create initial workflow history entry
      const { error: historyError } = await supabase
        .from("workflow_history")
        .insert({
          leave_application_id: newApplication.id,
          action: "SUBMIT",
          from_status: "new",
          to_status: "pending"
        });

      if (historyError) throw historyError;

      // Trigger email notification via edge function
      await supabase.functions.invoke('notify-leave-request', {
        body: { applicationId: newApplication.id }
      });

      return newApplication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveApplications"] });
      toast({
        title: "Success",
        description: "Leave application submitted successfully",
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
