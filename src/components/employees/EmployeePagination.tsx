import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EmployeePaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const EmployeePagination = ({ 
  total,
  currentPage,
  onPageChange 
}: EmployeePaginationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="text-sm text-slate-500">
        {total > 0 ? (
          <>Showing <span className="font-medium">1-{total}</span> of <span className="font-medium">{total}</span> employees</>
        ) : (
          "No employees to display"
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200">
          {currentPage}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          disabled={true}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
};
