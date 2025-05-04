import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { validateSAID } from "@/utils/validators";
import { toast } from "@/hooks/use-toast";
import type { Employee, EmploymentDetails } from "@/types/employee";

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  employee_id: z.string().min(1, "Employee ID is required"),
  tax_number: z.string().optional(),
  id_number: z.string().refine(validateSAID, "Invalid South African ID number"),
  bank_name: z.string().optional(),
  bank_account_number: z.string().optional(),
  bank_branch_code: z.string().optional(),
  bank_account_type: z.string().optional(),
  basic_salary: z.string().min(1, "Basic salary is required"),
  employment_type: z.string(),
  payment_frequency: z.string(),
  tax_calculation_type: z.string(),
  medical_aid: z.boolean().default(false),
  retirement_fund: z.boolean().default(false),
  start_date: z.string(),
  status: z.string(),
});

export type EmployeeFormData = z.infer<typeof formSchema>;

export const useEmployeeForm = (
  employee?: Employee & { employment_details?: EmploymentDetails[] },
  mode: 'add' | 'edit' = 'add'
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasTaxNumber, setHasTaxNumber] = useState(false);
  const totalSteps = 3;

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      position: "",
      department: "",
      employee_id: "",
      tax_number: "",
      id_number: "",
      bank_name: "",
      bank_account_number: "",
      bank_branch_code: "",
      bank_account_type: "",
      basic_salary: "",
      employment_type: "Full-time",
      payment_frequency: "Monthly",
      tax_calculation_type: "PAYE",
      medical_aid: false,
      retirement_fund: false,
      start_date: new Date().toISOString().split("T")[0],
      status: "Active"
    },
  });

  const nextStep = () => {
    const fieldsToValidate = currentStep === 1 
      ? ["first_name", "last_name", "email", "position", "department", "employee_id", "id_number"]
      : currentStep === 2 
      ? hasTaxNumber ? ["tax_number"] : [] 
      : ["basic_salary", "employment_type", "payment_frequency"];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(1);
    setHasTaxNumber(false);
  };

  return {
    form,
    currentStep,
    totalSteps,
    hasTaxNumber,
    setHasTaxNumber,
    nextStep,
    prevStep,
    resetForm,
  };
};
