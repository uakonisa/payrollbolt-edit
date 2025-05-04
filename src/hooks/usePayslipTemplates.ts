import { useQuery } from '@tanstack/react-query';
import { fetchPayslipTemplates } from '@/data/queries';
import { useToast } from "@/hooks/use-toast";

export function usePayslipTemplates() {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['payslipTemplates'],
    queryFn: fetchPayslipTemplates,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error loading templates",
          description: "There was a problem loading the payslip templates.",
        });
      }
    }
  });
}
