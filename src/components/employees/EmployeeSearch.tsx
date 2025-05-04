import React from 'react';
import { Search, Filter, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmployeeSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}

export const EmployeeSearch = ({
  searchTerm,
  onSearchChange,
  onRefresh
}: EmployeeSearchProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
        <Button variant="outline" size="icon" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
    </div>
  );
};
