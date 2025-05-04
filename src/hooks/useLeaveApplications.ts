import { useLeaveApplicationsList } from "./queries/useLeaveApplicationsList";
import { useApplyForLeave } from "./mutations/useApplyForLeave";

export interface LeaveApplication {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string | null;
  approval_notes: string | null;
  workflow_stage: string;
  created_at: string;
  updated_at: string;
}

export const useLeaveApplications = () => {
  const { leaveApplications, isLoading } = useLeaveApplicationsList();
  const { mutate: applyForLeave, isPending: isSubmitting } = useApplyForLeave();

  return {
    leaveApplications,
    isLoading,
    applyForLeave,
    isSubmitting,
  };
};
