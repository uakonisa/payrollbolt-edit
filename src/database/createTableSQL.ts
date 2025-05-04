// This file contains SQL scripts that would be used to create the database tables
// These are provided for reference and documentation purposes

export const employeesTable = `
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  tax_number TEXT NOT NULL,
  id_number TEXT NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Active',
  bank_name TEXT,
  bank_account_number TEXT,
  bank_branch_code TEXT,
  bank_account_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const employmentDetailsTable = `
CREATE TABLE IF NOT EXISTS employment_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  basic_salary NUMERIC NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  payment_frequency TEXT NOT NULL DEFAULT 'Monthly',
  tax_calculation_type TEXT NOT NULL DEFAULT 'PAYE',
  medical_aid BOOLEAN DEFAULT FALSE,
  retirement_fund BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const departmentsTable = `
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES employees(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const payrollRunsTable = `
CREATE TABLE IF NOT EXISTS payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_name TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  payment_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'processing', 'approved', 'paid', 'cancelled')),
  total_gross NUMERIC NOT NULL DEFAULT 0,
  total_deductions NUMERIC NOT NULL DEFAULT 0,
  total_net NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const payrollItemsTable = `
CREATE TABLE IF NOT EXISTS payroll_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id UUID NOT NULL REFERENCES payroll_runs(id),
  employee_id UUID NOT NULL REFERENCES employees(id),
  basic_salary NUMERIC NOT NULL,
  overtime_hours NUMERIC,
  overtime_amount NUMERIC,
  bonus_amount NUMERIC,
  commission_amount NUMERIC,
  allowances_amount NUMERIC,
  gross_pay NUMERIC NOT NULL,
  paye_tax NUMERIC NOT NULL,
  uif_amount NUMERIC NOT NULL,
  medical_aid_amount NUMERIC,
  retirement_fund_amount NUMERIC,
  other_deductions_amount NUMERIC,
  total_deductions NUMERIC NOT NULL,
  net_pay NUMERIC NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'cash', 'check')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const taxTablesTable = `
CREATE TABLE IF NOT EXISTS tax_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_year TEXT NOT NULL,
  bracket_min NUMERIC NOT NULL,
  bracket_max NUMERIC,
  base_amount NUMERIC NOT NULL,
  rate_percent NUMERIC NOT NULL,
  effective_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const payslipTemplatesTable = `
CREATE TABLE IF NOT EXISTS payslip_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  header_text TEXT,
  footer_text TEXT,
  company_logo_url TEXT,
  show_ytd_figures BOOLEAN NOT NULL DEFAULT true,
  show_leave_balance BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const paymentMethodsTable = `
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank_transfer', 'cash', 'check')),
  bank_name TEXT,
  account_number TEXT,
  branch_code TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const userRolesTable = `
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  permissions TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role_id UUID NOT NULL REFERENCES user_roles(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const leaveTypesTable = `
CREATE TABLE IF NOT EXISTS leave_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  days_allowed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const leaveApplicationsTable = `
CREATE TABLE IF NOT EXISTS leave_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  leave_type_id UUID NOT NULL REFERENCES leave_types(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  workflow_stage TEXT NOT NULL DEFAULT 'submitted',
  approval_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const companySettingsTable = `
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  registration_number TEXT,
  vat_number TEXT,
  paye_reference TEXT,
  uif_reference TEXT,
  sdl_reference TEXT,
  physical_address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  contact_person TEXT,
  contact_position TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

export const updateTimestampTrigger = `
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

export const createUpdateTriggers = `
-- Create triggers for each table to automatically update the updated_at column
CREATE TRIGGER set_employees_timestamp
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_employment_details_timestamp
BEFORE UPDATE ON employment_details
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_departments_timestamp
BEFORE UPDATE ON departments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add similar triggers for all other tables
`;
