import { supabase } from "@/integrations/supabase/client";
import type { Employee, EmploymentDetails } from "@/types/employee";
import type { 
  Department, 
  LeaveType, 
  LeaveApplication, 
  CompanySettings,
  PaymentMethod,
  TaxTable,
  PayslipTemplate,
  PayPeriod
} from "@/types/database";

export async function fetchEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('employees')
    .select('*');
  
  if (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
  
  return data as Employee[];
}

export async function fetchEmploymentDetails(employeeId: string): Promise<EmploymentDetails | null> {
  const { data, error } = await supabase
    .from('employment_details')
    .select('*')
    .eq('employee_id', employeeId)
    .single();
  
  if (error) {
    console.error('Error fetching employment details:', error);
    return null;
  }
  
  return data as EmploymentDetails;
}

export async function fetchDepartments(): Promise<Department[]> {
  const { data, error } = await supabase
    .from('departments')
    .select('*');
  
  if (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
  
  return data as Department[];
}

export async function fetchLeaveTypes(): Promise<LeaveType[]> {
  const { data, error } = await supabase
    .from('leave_types')
    .select('*');
  
  if (error) {
    console.error('Error fetching leave types:', error);
    return [];
  }
  
  return data as LeaveType[];
}

export async function fetchLeaveApplications(employeeId?: string): Promise<LeaveApplication[]> {
  let query = supabase
    .from('leave_applications')
    .select('*');
  
  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching leave applications:', error);
    return [];
  }
  
  return data as LeaveApplication[];
}

export async function fetchCompanySettings(): Promise<CompanySettings | null> {
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching company settings:', error);
    return null;
  }
  
  return data as CompanySettings;
}

export async function saveCompanySettings(settings: Partial<CompanySettings>): Promise<CompanySettings | null> {
  // If settings exist, update them, otherwise insert new settings
  const { data: existingSettings } = await supabase
    .from('company_settings')
    .select('id')
    .maybeSingle();

  if (existingSettings?.id) {
    const { data, error } = await supabase
      .from('company_settings')
      .update(settings)
      .eq('id', existingSettings.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating company settings:', error);
      return null;
    }

    return data as CompanySettings;
  } else {
    // Ensure company_name is provided for new records
    if (!settings.company_name) {
      console.error('Company name is required for new company settings');
      return null;
    }
    
    // Cast settings to a proper type to ensure company_name is included
    const companySettingsInsert = {
      company_name: settings.company_name,
      registration_number: settings.registration_number,
      vat_number: settings.vat_number,
      paye_reference: settings.paye_reference,
      uif_reference: settings.uif_reference,
      sdl_reference: settings.sdl_reference,
      physical_address: settings.physical_address,
      city: settings.city,
      province: settings.province,
      postal_code: settings.postal_code,
      contact_person: settings.contact_person,
      contact_position: settings.contact_position,
      contact_email: settings.contact_email,
      contact_phone: settings.contact_phone
    };

    const { data, error } = await supabase
      .from('company_settings')
      .insert(companySettingsInsert)
      .select()
      .single();

    if (error) {
      console.error('Error creating company settings:', error);
      return null;
    }

    return data as CompanySettings;
  }
}

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .order('is_default', { ascending: false });
  
  if (error) {
    console.error('Error fetching payment methods:', error);
    return [];
  }
  
  return data as PaymentMethod[];
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
    return [];
  }
  
  return data as TaxTable[];
}

export async function fetchPayslipTemplates(): Promise<PayslipTemplate[]> {
  const { data, error } = await supabase
    .from('payslip_templates')
    .select('*')
    .order('is_default', { ascending: false });
  
  if (error) {
    console.error('Error fetching payslip templates:', error);
    return [];
  }
  
  return data as PayslipTemplate[];
}

export async function fetchPayPeriods(): Promise<PayPeriod[]> {
  const { data, error } = await supabase
    .from('pay_periods')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching pay periods:', error);
    return [];
  }
  
  return data as PayPeriod[];
}
