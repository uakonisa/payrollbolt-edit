import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const TaxTableImport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result;
          const taxData = JSON.parse(content as string);
          
          // Insert tax table data
          const { error } = await supabase
            .from('tax_tables')
            .insert(taxData.map((item: any) => ({
              tax_year: item.tax_year,
              bracket_min: item.bracket_min,
              bracket_max: item.bracket_max,
              base_amount: item.base_amount,
              rate_percent: item.rate_percent,
              effective_date: item.effective_date
            })));

          if (error) throw error;
          toast({
            title: "Success",
            description: "Tax tables imported successfully",
          });
        } catch (error) {
          console.error('Error importing tax tables:', error);
          toast({
            title: "Error",
            description: "Failed to import tax tables. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={() => document.getElementById('tax-table-file')?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Import New Tax Tables
      </Button>
      <input
        id="tax-table-file"
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
