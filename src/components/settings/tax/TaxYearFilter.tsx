import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaxYearFilterProps {
  filterYear: string;
  onYearChange: (year: string) => void;
  uniqueYears: string[];
}

export function TaxYearFilter({ filterYear, onYearChange, uniqueYears }: TaxYearFilterProps) {
  return (
    <Select 
      value={filterYear} 
      onValueChange={onYearChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Year" />
      </SelectTrigger>
      <SelectContent>
        {uniqueYears.map(year => (
          <SelectItem key={year} value={year}>
            {year === 'all' ? 'All Years' : year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
