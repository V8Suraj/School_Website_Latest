import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AdminPageShell = ({ title, subtitle, onAdd, addLabel = "Add New", children }) => (
  <div className="p-6 md:p-8 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-secondary">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {onAdd && (
        <Button onClick={onAdd} variant="hero" size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> {addLabel}
        </Button>
      )}
    </div>
    {children}
  </div>
);