import { useQuery } from '@tanstack/react-query';
import { fetchPaymentMethods } from '@/data/queries';
import { useToast } from "@/hooks/use-toast";

export function usePaymentMethods() {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['paymentMethods'],
    queryFn: fetchPaymentMethods,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error loading payment methods",
          description: "There was a problem loading the payment methods.",
        });
      }
    }
  });
}
