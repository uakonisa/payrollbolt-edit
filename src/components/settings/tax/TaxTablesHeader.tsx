import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxTableImport } from "../TaxTableImport";
import { TaxYearFilter } from "./TaxYearFilter";

interface TaxTablesHeaderProps {
  filterYear: string;
  onYearChange: (year: string) => void;
  uniqueYears: string[];
}

export function TaxTablesHeader({ filterYear, onYearChange, uniqueYears }: TaxTablesHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Tax Tables</CardTitle>
        <CardDescription>Manage South African tax tables and rates</CardDescription>
      </div>
      <div className="flex items-center gap-4">
        <TaxYearFilter
          filterYear={filterYear}
          onYearChange={onYearChange}
          uniqueYears={uniqueYears}
        />
        <TaxTableImport />
      </div>
    </CardHeader>
  );
}
