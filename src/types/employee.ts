export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  employee_id: string;
  tax_number: string;
  id_number: string;
  start_date: string;
  status: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_branch_code?: string;
  bank_account_type?: string;
}

export interface EmploymentDetails {
  id: string;
  employee_id: string;
  basic_salary: number;
  employment_type: string;
  payment_frequency: string;
  tax_calculation_type: string;
  medical_aid: boolean;
  retirement_fund: boolean;
}
