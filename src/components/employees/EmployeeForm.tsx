import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useEmployeeForm } from "@/hooks/employees/useEmployeeForm";
import { FormContainer } from "./form/FormContainer";
import { PersonalInfoStep } from "./form/PersonalInfoStep";
import { BankingTaxStep } from "./form/BankingTaxStep";
import { EmploymentDetailsStep } from "./form/EmploymentDetailsStep";
import type { Employee, EmploymentDetails } from "@/types/employee";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { 
    employee: Omit<Employee, "id">, 
    employmentDetails: Omit<EmploymentDetails, "id" | "employee_id"> 
  }) => void;
  employee?: Employee & { employment_details?: EmploymentDetails[] };
  mode?: 'add' | 'edit';
}

export function EmployeeForm({ 
  open, 
  onClose, 
  onSubmit, 
  employee, 
  mode = 'add' 
}: EmployeeFormProps) {
  const {
    form,
    currentStep,
    totalSteps,
    hasTaxNumber,
    setHasTaxNumber,
    nextStep,
    prevStep,
    resetForm,
  } = useEmployeeForm(employee, mode);

  const stepTitles = ["Personal Information", "Banking & Tax", "Employment Details"];

  // Set form values when editing an employee
  useEffect(() => {
    if (employee && mode === 'edit') {
      const employmentDetail = employee.employment_details?.[0];
      
      form.reset({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        employee_id: employee.employee_id,
        tax_number: employee.tax_number || "",
        id_number: employee.id_number,
        bank_name: employee.bank_name || "",
        bank_account_number: employee.bank_account_number || "",
        bank_branch_code: employee.bank_branch_code || "",
        bank_account_type: employee.bank_account_type || "",
        start_date: employee.start_date,
        status: employee.status || "Active",
        basic_salary: employmentDetail ? String(employmentDetail.basic_salary) : "",
        employment_type: employmentDetail?.employment_type || "Full-time",
        payment_frequency: employmentDetail?.payment_frequency || "Monthly",
        tax_calculation_type: employmentDetail?.tax_calculation_type || "PAYE",
        medical_aid: employmentDetail?.medical_aid || false,
        retirement_fund: employmentDetail?.retirement_fund || false
      });
      
      setHasTaxNumber(!!employee.tax_number);
    }
  }, [employee, form, mode]);

  const handleSubmit = (values: any) => {
    const employeeData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      position: values.position,
      department: values.department,
      employee_id: values.employee_id,
      tax_number: hasTaxNumber ? values.tax_number : "",
      id_number: values.id_number,
      bank_name: values.bank_name || "",
      bank_account_number: values.bank_account_number || "",
      bank_branch_code: values.bank_branch_code || "",
      bank_account_type: values.bank_account_type || "",
      start_date: values.start_date,
      status: values.status
    };

    const employmentData = {
      basic_salary: parseFloat(values.basic_salary),
      employment_type: values.employment_type,
      payment_frequency: values.payment_frequency,
      tax_calculation_type: values.tax_calculation_type,
      medical_aid: values.medical_aid,
      retirement_fund: values.retirement_fund,
    };

    onSubmit({ employee: employeeData, employmentDetails: employmentData });
    resetForm();
    onClose();
    toast({
      title: mode === 'add' ? "Employee added" : "Employee updated",
      description: `${values.first_name} ${values.last_name} has been ${mode === 'add' ? 'added' : 'updated'} successfully.`
    });
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <BankingTaxStep form={form} hasTaxNumber={hasTaxNumber} setHasTaxNumber={setHasTaxNumber} />;
      case 3:
        return <EmploymentDetailsStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <FormContainer
      open={open}
      onClose={onClose}
      form={form}
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepTitles={stepTitles}
      onSubmit={handleSubmit}
      nextStep={nextStep}
      prevStep={prevStep}
      resetForm={resetForm}
      mode={mode}
    >
      {renderFormStep()}
    </FormContainer>
  );
}
