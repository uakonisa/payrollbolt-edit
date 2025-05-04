import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Edit, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Employee } from '@/types/employee';

interface EmployeesTableProps {
  employees: Employee[];
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  onView?: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  isLoading?: boolean;
}

export function EmployeesTable({ 
  employees,
  selectedIds = [],
  onSelect,
  onView,
  onEdit,
  isLoading
}: EmployeesTableProps) {
  const handleToggleSelect = (id: string) => {
    if (!onSelect) return;
    
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    onSelect(newSelection);
  };

  const handleToggleSelectAll = () => {
    if (!onSelect) return;
    
    if (selectedIds.length === employees.length) {
      onSelect([]);
    } else {
      onSelect(employees.map(emp => emp.id));
    }
  };

  const handleViewClick = (e: React.MouseEvent, employee: Employee) => {
    e.preventDefault();
    e.stopPropagation();
    if (onView) {
      onView(employee);
    }
  };

  const handleEditClick = (e: React.MouseEvent, employee: Employee) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(employee);
    }
  };

  const handleDropdownItemClick = (e: React.MouseEvent, action: string, employee: Employee) => {
    e.preventDefault();
    e.stopPropagation();
    
    switch (action) {
      case "view":
        onView?.(employee);
        break;
      case "edit":
        onEdit?.(employee);
        break;
      default:
        console.log(`Action ${action} clicked for employee:`, employee);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active":
        return "border-green-200 bg-green-50 text-green-700";
      case "On Leave":
        return "border-amber-200 bg-amber-50 text-amber-700";
      case "New":
        return "border-blue-200 bg-blue-50 text-blue-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-700";
    }
  };

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center text-slate-500">
          Loading employees...
        </TableCell>
      </TableRow>
    );
  }

  if (employees.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center text-slate-500">
          No employees found.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          <TableHead className="w-[50px]">
            <Checkbox 
              checked={selectedIds.length === employees.length && employees.length > 0}
              onCheckedChange={handleToggleSelectAll}
              aria-label="Select all employees"
            />
          </TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Employee ID</TableHead>
          <TableHead>Tax Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id} className="hover:bg-slate-50">
            <TableCell>
              <Checkbox 
                checked={selectedIds.includes(employee.id)}
                onCheckedChange={() => handleToggleSelect(employee.id)}
                aria-label={`Select ${employee.first_name} ${employee.last_name}`}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback>
                    {employee.first_name.charAt(0)}{employee.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{employee.first_name} {employee.last_name}</div>
                  <div className="text-sm text-slate-500">{employee.position} • {employee.department}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{employee.employee_id}</TableCell>
            <TableCell>{employee.tax_number}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(employee.status)}>
                {employee.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 mr-1"
                  onClick={(e) => handleViewClick(e, employee)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View Details</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={(e) => handleDropdownItemClick(e, "view", employee)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDropdownItemClick(e, "edit", employee)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Employee
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDropdownItemClick(e, "payroll", employee)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Payroll History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleDropdownItemClick(e, "irp5", employee)}>
                      Generate IRP5
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDropdownItemClick(e, "tax", employee)}>
                      View Tax Certificate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
