import { useEmployeesList } from "./useEmployeesList";
import { useAddEmployee } from "./useAddEmployee";
import { useUpdateEmployee } from "./useUpdateEmployee";
import { useGenerateDemoData } from "./useGenerateDemoData";

export const useEmployees = () => {
  const { employees, isLoading, refetch, getEmployee } = useEmployeesList();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const generateDemoData = useGenerateDemoData();

  return {
    employees,
    isLoading,
    refetch,
    getEmployee,
    addEmployee,
    updateEmployee,
    generateDemoData
  };
};
