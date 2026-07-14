import { Search } from "lucide-react";
import React from "react";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import TagPill from "./TagPill";
import { useMemo } from "react";
import TagFormDialog from "./TagFormDialog";

const tagColors = [
  "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
  "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
  "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
  "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
];

const TagTab = ({ tags }) => {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const filtered = useMemo(() => {
    let list = [...tags];

    if (search.trim()) {
      const q = search.toLocaleLowerCase();

      list = list.filter(
        (t) =>
          t.name?.toLocaleLowerCase().includes(q) ||
          t.slug?.toLocaleLowerCase().includes(q),
      );
    }
    return list;
  }, [tags, search]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search Categories..."
            className={"pl-9 h-9 bg-white"}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>
            {filtered.length}/{tags.length}
          </span>
          <Button onClick={() => setFormOpen(true)} size="sm">
            <Plus className="h-3.5 w-3.5" /> Add Tag
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-5">
        {filtered.map((tag, index) => (
          <TagPill
            key={tag.id}
            tag={tag}
            onEdit={() => {
              setFormOpen(true);
              setEditTarget(tag);
            }}
            colorClass={tagColors[index % tagColors.length]}
          />
        ))}
      </div>

      <TagFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          
        }}
        initialData={editTarget}
        isEdit={!!editTarget}
      />
    </div>
  );
};

export default TagTab;
