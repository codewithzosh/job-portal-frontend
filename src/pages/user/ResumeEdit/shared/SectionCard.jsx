import React from "react";
import { Button } from "../../../../components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

const SectionCard = ({ item, onEdit, onDelete, children }) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-200 transition-colors">
      <div className="flex-1">{children}</div>
      <div>
        <Button
          onClick={() => onEdit(item)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-red-600"
          onClick={() => onDelete(item)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default SectionCard;
