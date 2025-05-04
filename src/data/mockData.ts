import type { 
  PayrollRun, 
  CompanySettings, 
  TaxTable 
} from "@/types/database";

export function getMockPayrollRuns(): PayrollRun[] {
  return [
    {
      id: "1",
      period_name: "April 2024",
      period_start: "2024-04-01",
      period_end: "2024-04-30",
      payment_date: "2024-04-25",
      status: "processing",
      total_gross: 450000,
      total_deductions: 120000,
      total_net: 330000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}

export function getMockCompanySettings(): CompanySettings {
  return {
    id: "1",
    company_name: "Acme Corporation (Pty) Ltd",
    registration_number: "2022/123456/07",
    vat_number: "4560123456",
    paye_reference: "7530123456",
    uif_reference: "1234567/8",
    sdl_reference: "L123456789",
    physical_address: "123 Main Street",
    city: "Cape Town",
    province: "Western Cape",
    postal_code: "8001",
    contact_person: "Jane Smith",
    contact_position: "Finance Director",
    contact_email: "jane@acmecorp.co.za",
    contact_phone: "021 555 1234",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

export function getMockTaxTables(taxYear?: string): TaxTable[] {
  const mockTaxTables: TaxTable[] = [
    {
      id: "1",
      tax_year: "2024-2025",
      bracket_min: 0,
      bracket_max: 226000,
      base_amount: 0,
      rate_percent: 18,
      effective_date: "2024-03-01",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      tax_year: "2024-2025",
      bracket_min: 226001,
      bracket_max: 353100,
      base_amount: 40680,
      rate_percent: 26,
      effective_date: "2024-03-01",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  
  if (taxYear) {
    return mockTaxTables.filter(table => table.tax_year === taxYear);
  }
  
  return mockTaxTables;
}
