import { getMockPayrollRuns, getMockCompanySettings, getMockTaxTables } from './mockData';
import type { PayrollRun, CompanySettings, TaxTable } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';

export async function fetchPayrollRuns(): Promise<PayrollRun[]> {
  const { data, error } = await supabase
    .from('payroll_runs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payroll runs:', error);
    return getMockPayrollRuns();
  }

  return data as PayrollRun[];
}

export async function fetchCompanySettings(): Promise<CompanySettings | null> {
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching company settings:', error);
    return getMockCompanySettings();
  }

  return data;
}

export async function fetchTaxTables(taxYear?: string): Promise<TaxTable[]> {
  let query = supabase
    .from('tax_tables')
    .select('*')
    .order('bracket_min', { ascending: true });

  if (taxYear) {
    query = query.eq('tax_year', taxYear);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tax tables:', error);
    return getMockTaxTables(taxYear);
  }

  return data;
}

export * from './queries';
