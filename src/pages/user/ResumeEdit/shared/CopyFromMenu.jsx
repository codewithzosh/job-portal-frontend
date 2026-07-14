import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import { FileText } from "lucide-react";
import { Button } from "../../../../components/ui/button";

function CopyFromMenu({ resumes }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="gap-1.5 text-xs text-slate-600 border-dashed hover:text-primary hover:border-primary"
          variant="outline"
          size="sm"
        >
          Copy From Resume
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-60"}>
        <DropdownMenuLabel className="text-xs text-slate-500 font-normal">Select a resume to copy</DropdownMenuLabel>

        <DropdownMenuSeparator />
        {resumes.map(
    (item)=> <DropdownMenuItem  className="cursor-pointer gap-2">
            <FileText />
            <span>
                {item.title}
            </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CopyFromMenu;
