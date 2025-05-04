import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanySettings, saveCompanySettings } from '@/data/queries';
import { toast } from 'sonner';

export function useCompanySettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['companySettings'],
    queryFn: fetchCompanySettings,
  });

  const mutation = useMutation({
    mutationFn: saveCompanySettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companySettings'] });
      toast.success('Company settings updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update company settings');
      console.error('Error saving company settings:', error);
    },
  });

  return {
    settings: query.data,
    isLoading: query.isLoading,
    error: query.error,
    saveSettings: mutation.mutate,
    isSaving: mutation.isPending,
  };
}
