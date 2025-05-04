export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_settings: {
        Row: {
          city: string | null
          company_name: string
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          contact_position: string | null
          created_at: string
          id: string
          paye_reference: string | null
          physical_address: string | null
          postal_code: string | null
          province: string | null
          registration_number: string | null
          sdl_reference: string | null
          uif_reference: string | null
          updated_at: string
          vat_number: string | null
        }
        Insert: {
          city?: string | null
          company_name: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string
          id?: string
          paye_reference?: string | null
          physical_address?: string | null
          postal_code?: string | null
          province?: string | null
          registration_number?: string | null
          sdl_reference?: string | null
          uif_reference?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Update: {
          city?: string | null
          company_name?: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string
          id?: string
          paye_reference?: string | null
          physical_address?: string | null
          postal_code?: string | null
          province?: string | null
          registration_number?: string | null
          sdl_reference?: string | null
          uif_reference?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          manager_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          bank_account_number: string | null
          bank_account_type: string | null
          bank_branch_code: string | null
          bank_name: string | null
          created_at: string
          department: string
          email: string
          employee_id: string
          first_name: string
          id: string
          id_number: string
          last_name: string
          position: string
          start_date: string
          status: string
          tax_number: string
          updated_at: string
        }
        Insert: {
          bank_account_number?: string | null
          bank_account_type?: string | null
          bank_branch_code?: string | null
          bank_name?: string | null
          created_at?: string
          department: string
          email: string
          employee_id: string
          first_name: string
          id?: string
          id_number: string
          last_name: string
          position: string
          start_date?: string
          status?: string
          tax_number: string
          updated_at?: string
        }
        Update: {
          bank_account_number?: string | null
          bank_account_type?: string | null
          bank_branch_code?: string | null
          bank_name?: string | null
          created_at?: string
          department?: string
          email?: string
          employee_id?: string
          first_name?: string
          id?: string
          id_number?: string
          last_name?: string
          position?: string
          start_date?: string
          status?: string
          tax_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      employment_details: {
        Row: {
          basic_salary: number
          created_at: string
          employee_id: string | null
          employment_type: string
          id: string
          medical_aid: boolean | null
          payment_frequency: string
          retirement_fund: boolean | null
          tax_calculation_type: string
          updated_at: string
        }
        Insert: {
          basic_salary: number
          created_at?: string
          employee_id?: string | null
          employment_type?: string
          id?: string
          medical_aid?: boolean | null
          payment_frequency?: string
          retirement_fund?: boolean | null
          tax_calculation_type?: string
          updated_at?: string
        }
        Update: {
          basic_salary?: number
          created_at?: string
          employee_id?: string | null
          employment_type?: string
          id?: string
          medical_aid?: boolean | null
          payment_frequency?: string
          retirement_fund?: boolean | null
          tax_calculation_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employment_details_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_applications: {
        Row: {
          approval_notes: string | null
          created_at: string
          employee_id: string
          end_date: string
          id: string
          leave_type_id: string
          reason: string | null
          start_date: string
          status: string
          updated_at: string
          workflow_stage: string
        }
        Insert: {
          approval_notes?: string | null
          created_at?: string
          employee_id: string
          end_date: string
          id?: string
          leave_type_id: string
          reason?: string | null
          start_date: string
          status?: string
          updated_at?: string
          workflow_stage?: string
        }
        Update: {
          approval_notes?: string | null
          created_at?: string
          employee_id?: string
          end_date?: string
          id?: string
          leave_type_id?: string
          reason?: string | null
          start_date?: string
          status?: string
          updated_at?: string
          workflow_stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_applications_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_types: {
        Row: {
          created_at: string
          days_allowed: number
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_allowed?: number
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_allowed?: number
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      pay_periods: {
        Row: {
          created_at: string
          cutoff_date: string
          end_date: string
          frequency: string
          id: string
          name: string
          payment_date: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cutoff_date: string
          end_date: string
          frequency: string
          id?: string
          name: string
          payment_date: string
          start_date: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cutoff_date?: string
          end_date?: string
          frequency?: string
          id?: string
          name?: string
          payment_date?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_number: string | null
          bank_name: string | null
          branch_code: string | null
          created_at: string
          id: string
          is_default: boolean
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          branch_code?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          branch_code?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      payroll_runs: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          payment_date: string
          period_end: string
          period_name: string
          period_start: string
          status: string
          total_deductions: number
          total_gross: number
          total_net: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          payment_date: string
          period_end: string
          period_name: string
          period_start: string
          status: string
          total_deductions?: number
          total_gross?: number
          total_net?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          payment_date?: string
          period_end?: string
          period_name?: string
          period_start?: string
          status?: string
          total_deductions?: number
          total_gross?: number
          total_net?: number
          updated_at?: string
        }
        Relationships: []
      }
      payslip_templates: {
        Row: {
          company_logo_url: string | null
          created_at: string
          footer_text: string | null
          header_text: string | null
          id: string
          is_default: boolean
          name: string
          show_leave_balance: boolean
          show_ytd_figures: boolean
          updated_at: string
        }
        Insert: {
          company_logo_url?: string | null
          created_at?: string
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_default?: boolean
          name: string
          show_leave_balance?: boolean
          show_ytd_figures?: boolean
          updated_at?: string
        }
        Update: {
          company_logo_url?: string | null
          created_at?: string
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_default?: boolean
          name?: string
          show_leave_balance?: boolean
          show_ytd_figures?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      tax_tables: {
        Row: {
          base_amount: number
          bracket_max: number | null
          bracket_min: number
          created_at: string
          effective_date: string
          id: string
          rate_percent: number
          tax_year: string
          updated_at: string
        }
        Insert: {
          base_amount: number
          bracket_max?: number | null
          bracket_min: number
          created_at?: string
          effective_date: string
          id?: string
          rate_percent: number
          tax_year: string
          updated_at?: string
        }
        Update: {
          base_amount?: number
          bracket_max?: number | null
          bracket_min?: number
          created_at?: string
          effective_date?: string
          id?: string
          rate_percent?: number
          tax_year?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_history: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          from_status: string
          id: string
          leave_application_id: string
          notes: string | null
          to_status: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          from_status: string
          id?: string
          leave_application_id: string
          notes?: string | null
          to_status: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          from_status?: string
          id?: string
          leave_application_id?: string
          notes?: string | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_history_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_history_leave_application_id_fkey"
            columns: ["leave_application_id"]
            isOneToOne: false
            referencedRelation: "leave_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      validate_sa_id: {
        Args: { id_number: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
