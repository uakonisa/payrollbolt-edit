import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  tax_year: z.string().min(1, "Tax year is required"),
  bracket_min: z.string().min(1, "Minimum bracket is required"),
  bracket_max: z.string(),
  base_amount: z.string().min(1, "Base amount is required"),
  rate_percent: z.string().min(1, "Rate percentage is required"),
  effective_date: z.string().min(1, "Effective date is required"),
});

export function TaxTableForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tax_year: "",
      bracket_min: "",
      bracket_max: "",
      base_amount: "",
      rate_percent: "",
      effective_date: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("tax_tables").insert({
        tax_year: values.tax_year,
        bracket_min: Number(values.bracket_min),
        bracket_max: values.bracket_max ? Number(values.bracket_max) : null,
        base_amount: Number(values.base_amount),
        rate_percent: Number(values.rate_percent),
        effective_date: values.effective_date,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tax table entry created successfully",
      });
      
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tax table entry",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Tax Table Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tax_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024/2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="effective_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effective Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bracket_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Bracket</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bracket_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Bracket</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Optional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="base_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="18" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Add Tax Table Entry</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
