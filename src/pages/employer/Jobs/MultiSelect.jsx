import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Badge } from "../../../components/ui/badge";
import { X } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Check } from "lucide-react";

const MultiSelect = ({
  options = [],
  selectedIds = [],
  onChange,
  placeholder = "Select...",
  maxBadges = 3,
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedSet = new Set(selectedIds);

  const selectedOptions = options.filter((opt) => selectedSet.has(opt.id));

  const visibleBadges = selectedOptions.slice(0, maxBadges);
  const hiddenCount = selectedOptions.length - maxBadges;

  const toggle=(id)=>{
    if(selectedSet.has(id)){
      onChange(selectedIds.filter(sid=>sid!==id))
    }else{
      onChange([...selectedIds,id])
    }
  }

  const remove=(e,id)=>{
    e.stopPropagation();
    onChange(selectedIds.filter(sid=>sid!==id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <button
          className={cn(
            "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors",
            "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
            open && "border-primary ring-2 ring-primary ring-offset-1",
          )}
        >
          {selectedIds.length === 0 && (
            <span className="text-slate-400">{placeholder}</span>
          )}
          {selectedIds.length > 0 &&
            visibleBadges.map((o) => (
              <Badge
                key={o.id}
                variant="secondary"
                className="gap-1 px-1.5 py-0 text-xs font-medium bg-blue-50 text-primary border-blue-200"
              >
                {o.name}
                <span
                onClick={(e)=>remove(e,o.id)}
                  role="button"
                  tabIndex={-1}
                  className="cursor-pointer hover:text-blue-950"
                >
                  <X className="w-3 h-3"/>
                </span>
              </Badge>
            ))}
          {hiddenCount > 0 && (
            <Badge variant="outline" className="text-xs text-slate-500">
              +{hiddenCount} more
            </Badge>
          )}
          <ChevronsUpDown className="ml-auto h-3 w-3 text-slate-400" />
        </button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="max-h-52 overflow-y-auto py-1">
          {options.map((o) => {
            const isSelected = selectedSet.has(o.id);

            return (
              <button
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors",
                  isSelected && "bg-blue-50",
                )}

                onClick={()=>toggle(o.id)}
              >
                <div className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                    isSelected ? "border-primary bg-primary" : "border-slate-300"
                  )}>{isSelected && <Check className="h-2.5 w-2.5 text-white" />}</div>

                <span className={`${isSelected&&"font-medium text-primary"}`}>{o.name}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
