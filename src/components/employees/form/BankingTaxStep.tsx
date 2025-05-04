import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BankingTaxStepProps {
  form: UseFormReturn<any>;
  hasTaxNumber: boolean;
  setHasTaxNumber: (value: boolean) => void;
}

export const BankingTaxStep = ({ form, hasTaxNumber, setHasTaxNumber }: BankingTaxStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Banking & Tax Information</h2>
      
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="space-y-0.5">
          <FormLabel>Tax Number</FormLabel>
          <FormDescription>
            Does this employee have a tax number?
          </FormDescription>
        </div>
        <Switch
          checked={hasTaxNumber}
          onCheckedChange={setHasTaxNumber}
        />
      </div>
      
      {hasTaxNumber && (
        <FormField
          control={form.control}
          name="tax_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="bank_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank Name</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ABSA">ABSA</SelectItem>
                    <SelectItem value="Capitec">Capitec</SelectItem>
                    <SelectItem value="FNB">FNB</SelectItem>
                    <SelectItem value="Nedbank">Nedbank</SelectItem>
                    <SelectItem value="Standard Bank">Standard Bank</SelectItem>
                    <SelectItem value="African Bank">African Bank</SelectItem>
                    <SelectItem value="Discovery Bank">Discovery Bank</SelectItem>
                    <SelectItem value="TymeBank">TymeBank</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="bank_account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bank_branch_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="bank_account_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Type</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Current">Current</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Transmission">Transmission</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
