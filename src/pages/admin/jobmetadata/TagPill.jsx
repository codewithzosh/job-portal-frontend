import React from "react";
import { cn } from "../../../lib/utils";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTag } from "../../../reduxt-store/jobMeta/jobMetaThunk";

const TagPill = ({ tag, colorClass,onEdit }) => {

  const dispatch=useDispatch()

  const handleDelete=()=>{
    dispatch(deleteTag(tag.id))
  }

  console.log("tag pill",tag)
  return (
    <div
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        colorClass,
      )}
    >
      <span>{tag.name}</span>

      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
        <button onClick={onEdit}>
          <Pencil className="h-3 w-3" />
        </button>
        <button onClick={handleDelete}>
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default TagPill;
