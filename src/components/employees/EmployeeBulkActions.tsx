import React from 'react';
import { FileText, Download, FileSpreadsheet, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeBulkActionsProps {
  selectedEmployees: string[];
  onBulkAction: (action: string, format?: string) => void;
}

export const EmployeeBulkActions = ({
  selectedEmployees,
  onBulkAction
}: EmployeeBulkActionsProps) => {
  if (selectedEmployees.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => onBulkAction("Generate IRP5")}>
        <FileText className="mr-2 h-4 w-4" />
        Generate IRP5
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onBulkAction("Export", "excel")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onBulkAction("Export", "csv")}>
            <File className="mr-2 h-4 w-4" />
            CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
