import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsLayoutProps {
  children: React.ReactNode;
  onSave?: () => void;
  isSaving?: boolean;
}

export const SettingsLayout = ({ children, onSave, isSaving }: SettingsLayoutProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        {onSave && (
          <Button onClick={onSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
