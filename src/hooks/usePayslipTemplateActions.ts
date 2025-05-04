import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PayslipTemplate } from "@/types/database";

export function usePayslipTemplateActions() {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const setDefaultTemplate = async (templateId: string) => {
    setIsSaving(true);
    try {
      // First, reset all templates to non-default
      await supabase
        .from('payslip_templates')
        .update({ is_default: false })
        .neq('id', templateId);

      // Then set the selected template as default
      const { error } = await supabase
        .from('payslip_templates')
        .update({ is_default: true })
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Default template updated",
        description: "The template has been set as default successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating default template",
        description: "There was a problem setting the default template.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const previewTemplate = async (templateId: string) => {
    // This would be implemented to show a preview of the template
    console.log("Preview template:", templateId);
  };

  const editTemplate = async (template: PayslipTemplate) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('payslip_templates')
        .update({
          name: template.name,
          header_text: template.header_text,
          footer_text: template.footer_text,
          show_ytd_figures: template.show_ytd_figures,
          show_leave_balance: template.show_leave_balance,
        })
        .eq('id', template.id);

      if (error) throw error;

      toast({
        title: "Template updated",
        description: "The template has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating template",
        description: "There was a problem updating the template.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    setDefaultTemplate,
    previewTemplate,
    editTemplate
  };
}
