import { useQuery } from '@tanstack/react-query';
import { fetchPayPeriods } from '@/data/queries';
import { useToast } from "@/hooks/use-toast";

export function usePayPeriods() {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['payPeriods'],
    queryFn: fetchPayPeriods,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error loading pay periods",
          description: "There was a problem loading the pay periods.",
        });
      }
    }
  });
}
