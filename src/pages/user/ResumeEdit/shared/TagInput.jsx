import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const TagInput = ({ tags, onChange, placeholder = "Add tag..." }) => {
  const [val, setValue] = useState("");

  const add = () => {
    const v = val.trim();

    console.log("value ",v)
    if (v && !tags.includes(v)) {
        console.log("inside")
      onChange([...tags, v]);
      setValue("");
    }
  };

  console.log("tags", tags);
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((t) => (
          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
            {t}
            <button
              className="hover:text-red-500"
              type="button"
              onClick={() => onChange(tags.filter((x) => x !== t))}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Input placeholder={placeholder} value={val} onChange={(e)=>setValue(e.target.value)}/>
        <Button type="button"  variant="outline" onClick={add}>Add</Button>
      </div>
    </div>
  );
};

export default TagInput;
