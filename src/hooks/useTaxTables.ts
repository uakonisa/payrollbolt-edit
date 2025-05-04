import { useQuery } from '@tanstack/react-query';
import { fetchTaxTables } from '@/data/queries';
import { useToast } from "@/hooks/use-toast";

export function useTaxTables(taxYear?: string) {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['taxTables', taxYear],
    queryFn: () => fetchTaxTables(taxYear),
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error loading tax tables",
          description: "There was a problem loading the tax tables.",
        });
      }
    }
  });
}
