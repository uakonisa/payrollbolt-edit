import React from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerFooter 
} from "@/components/ui/drawer";
import { FormStepIndicator } from "./FormStepIndicator";
import { UseFormReturn } from "react-hook-form";
import type { EmployeeFormData } from "@/hooks/employees/useEmployeeForm";

interface FormContainerProps {
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<EmployeeFormData>;
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onSubmit: (data: EmployeeFormData) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  mode?: 'add' | 'edit';
  children: React.ReactNode;
}

export const FormContainer = ({
  open,
  onClose,
  form,
  currentStep,
  totalSteps,
  stepTitles,
  onSubmit,
  nextStep,
  prevStep,
  resetForm,
  mode = 'add',
  children,
}: FormContainerProps) => {
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent className="max-h-[85%]">
        <DrawerHeader>
          <DrawerTitle>{mode === 'add' ? 'Add New Employee' : 'Edit Employee'}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <FormStepIndicator 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            stepTitles={stepTitles}
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {children}

              <DrawerFooter className="px-0">
                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  <div className="flex-1" />
                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">{mode === 'add' ? 'Add Employee' : 'Update Employee'}</Button>
                  )}
                </div>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
