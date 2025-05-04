import { Card, CardContent } from "@/components/ui/card";
import { useTaxTables } from "@/hooks/useTaxTables";
import { useState } from "react";
import { TaxTableForm } from "./tax/TaxTableForm";
import { TaxTableList } from "./tax/TaxTableList";
import { TaxTablesHeader } from "./tax/TaxTablesHeader";

export const TaxTablesTab = () => {
  const { data: taxTables = [], refetch } = useTaxTables();
  const [filterYear, setFilterYear] = useState<string>('all');

  // Get unique tax years for filtering
  const uniqueYears = ['all', ...new Set(taxTables.map(table => table.tax_year.split(' ')[0]))];

  // Filter tax tables based on selected year
  const filteredTaxTables = filterYear === 'all' 
    ? taxTables 
    : taxTables.filter(table => table.tax_year.startsWith(filterYear));

  return (
    <div className="space-y-6">
      <Card>
        <TaxTablesHeader
          filterYear={filterYear}
          onYearChange={setFilterYear}
          uniqueYears={uniqueYears}
        />
        <CardContent>
          <TaxTableList taxTables={filteredTaxTables} onUpdate={refetch} />
        </CardContent>
      </Card>

      <TaxTableForm onSuccess={refetch} />
    </div>
  );
};
