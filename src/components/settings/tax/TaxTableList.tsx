import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaxTable } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TaxTableListProps {
  taxTables: TaxTable[];
  onUpdate: () => void;
}

export function TaxTableList({ taxTables, onUpdate }: TaxTableListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (table: TaxTable) => {
    setEditingId(table.id);
    setEditForm({
      tax_year: table.tax_year,
      bracket_min: table.bracket_min,
      bracket_max: table.bracket_max,
      base_amount: table.base_amount,
      rate_percent: table.rate_percent,
      effective_date: table.effective_date,
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('tax_tables')
        .update({
          tax_year: editForm.tax_year,
          bracket_min: Number(editForm.bracket_min),
          bracket_max: editForm.bracket_max ? Number(editForm.bracket_max) : null,
          base_amount: Number(editForm.base_amount),
          rate_percent: Number(editForm.rate_percent),
          effective_date: editForm.effective_date,
        })
        .eq('id', editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tax table updated successfully",
      });
      
      onUpdate();
      setEditingId(null);
      setEditForm(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tax table",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tax Year</TableHead>
          <TableHead>Effective Date</TableHead>
          <TableHead>Bracket Range</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taxTables.map((table) => (
          <TableRow key={table.id}>
            {editingId === table.id ? (
              <>
                <TableCell>
                  <Input
                    value={editForm.tax_year}
                    onChange={(e) => setEditForm({ ...editForm, tax_year: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={editForm.effective_date}
                    onChange={(e) => setEditForm({ ...editForm, effective_date: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={editForm.bracket_min}
                      onChange={(e) => setEditForm({ ...editForm, bracket_min: e.target.value })}
                    />
                    <Input
                      type="number"
                      value={editForm.bracket_max || ''}
                      onChange={(e) => setEditForm({ ...editForm, bracket_max: e.target.value })}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={editForm.rate_percent}
                    onChange={(e) => setEditForm({ ...editForm, rate_percent: e.target.value })}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button onClick={handleSave} size="sm" variant="outline">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleCancel} size="sm" variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="font-medium">{table.tax_year}</TableCell>
                <TableCell>{table.effective_date}</TableCell>
                <TableCell>
                  {table.bracket_max 
                    ? `${table.bracket_min.toLocaleString()} - ${table.bracket_max.toLocaleString()}`
                    : `${table.bracket_min.toLocaleString()} and above`}
                </TableCell>
                <TableCell>{table.rate_percent}%</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(table)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
