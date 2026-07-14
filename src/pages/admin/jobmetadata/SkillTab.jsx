import { Search } from "lucide-react";
import React from "react";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ChevronRight } from "lucide-react";

import { CheckCircle } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";
import { useMemo } from "react";
import SkillFormDialog from "./SkillFormDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../../reduxt-store/jobMeta/jobMetaThunk";

const SKILL_CATEGORIES = [
  "PROGRAMMING_LANGUAGE",
  "FRAMEWORK",
  "DATABASE",
  "CLOUD_PLATFORM",
  "DEVOPS",
  "DESIGN",
  "SOFT_SKILL",
  "TOOL",
  "LANGUAGE",
  "OTHER",
];
const SkillTab = ({ skills }) => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const dispatch=useDispatch()

  const filtered = useMemo(() => {
    let list = [...skills];

    if (search.trim()) {
      const q = search.toLocaleLowerCase();

      list = list.filter(
        (s) =>
          s.name?.toLocaleLowerCase().includes(q) ||
          s.slug?.toLocaleLowerCase().includes(q),
      );
    }
    if (catFilter != "all") list = list.filter((s) => s.category === catFilter);
    return list;
  }, [skills, search, catFilter]);

   const openEdit = (cat) => {
    setEditTarget(cat);
    setFormOpen(true);
  };

  const handleDelete=(skill)=>{
    dispatch(deleteSkill(skill.id))
    // api call
    console.log("deleted skill ",skill)
    setFormOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search Skills..."
            className={"pl-9 h-9 bg-white"}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>
            {filtered.length}/{skills.length}
          </span>
          <Button
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
            size="sm"
          >
            <Plus className="h-3.5 w-3.5" /> Add Skills
          </Button>
        </div>
      </div>

      {/* category filter chips */}
      <section className="flex items-center gap-2">
        <button onClick={() => setCatFilter("all")}>All</button>

        {SKILL_CATEGORIES.map((item) => (
          <button
            onClick={() => setCatFilter(item)}
            className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full border transition-colors",
              catFilter === item
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
            )}
          >
            {item.toLocaleLowerCase()}
          </button>
        ))}
      </section>

      {/* category table */}

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider w-10 pl-6">
                #
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Slug
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                category
              </TableHead>

              <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((skill, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <p className="text-sm font-semibold text-slate-900">
                      {skill.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {skill.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{skill.category}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${skill.verified ? "bg-green-100 text-green-700" : ""}`}
                    >
                      {skill.active && <CheckCircle className="h-3 w-3" />}
                      {skill.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                    <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => openEdit(skill)}>
                            <Pencil className="h-3.5 w-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>handleDelete(skill)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <SkillFormDialog
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

export default SkillTab;
