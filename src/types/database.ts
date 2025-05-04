export interface Department {
  id: string;
  name: string;
  description?: string;
  manager_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PayrollRun {
  id: string;
  period_name: string;
  period_start: string;
  period_end: string;
  payment_date: string;
  status: "draft" | "processing" | "approved" | "paid" | "cancelled";
  total_gross: number;
  total_deductions: number;
  total_net: number;
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface PayrollItem {
  id: string;
  payroll_run_id: string;
  employee_id: string;
  basic_salary: number;
  overtime_hours?: number;
  overtime_amount?: number;
  bonus_amount?: number;
  commission_amount?: number;
  allowances_amount?: number;
  gross_pay: number;
  paye_tax: number;
  uif_amount: number;
  medical_aid_amount?: number;
  retirement_fund_amount?: number;
  other_deductions_amount?: number;
  total_deductions: number;
  net_pay: number;
  payment_method: "bank_transfer" | "cash" | "check";
  payment_status: "pending" | "paid" | "failed";
  created_at: string;
  updated_at: string;
}

export interface TaxTable {
  id: string;
  tax_year: string;
  bracket_min: number;
  bracket_max: number;
  base_amount: number;
  rate_percent: number;
  effective_date: string;
  created_at: string;
  updated_at: string;
}

export interface PayslipTemplate {
  id: string;
  name: string;
  is_default: boolean;
  header_text?: string;
  footer_text?: string;
  company_logo_url?: string;
  show_ytd_figures: boolean;
  show_leave_balance: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "bank_transfer" | "cash" | "check";
  bank_name?: string;
  account_number?: string;
  branch_code?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaveType {
  id: string;
  name: string;
  description?: string;
  days_allowed: number;
  created_at: string;
  updated_at: string;
}

export interface LeaveApplication {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  reason?: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  workflow_stage: string;
  approval_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  registration_number?: string;
  vat_number?: string;
  paye_reference?: string;
  uif_reference?: string;
  sdl_reference?: string;
  physical_address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  contact_person?: string;
  contact_position?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface PayPeriod {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  payment_date: string;
  cutoff_date: string;
  frequency: "weekly" | "bi-weekly" | "monthly";
  status: "pending" | "active" | "closed";
  created_at: string;
  updated_at: string;
}
