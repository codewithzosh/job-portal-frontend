import React from "react";

import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import AddButton from "./shared/AddButton";
import { useState } from "react";

import SectionCard from "./shared/SectionCard";
import SectionDialog from "./shared/SectionDialog";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";

import { Textarea } from "../../../components/ui/textarea";

import DeleteConfirm from "./shared/DeleteConfirm";

import { certifications } from "./shared/certificationData";
import { awards } from "./shared/award";

const awardData = { title: "", issuedBy: "", awardDate: "", description: "" };

const AwardsSection = () => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(awardData);

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const openAdd = () => {
    setOpen(true);
  };

  const save = () => {
    console.log("save project", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    console.log("deleting", delItem);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CopyFromMenu resumes={resumes} />
        <AddButton onClick={openAdd} label="Add Award" />
      </div>

      {awards.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-xs text-slate-600">{item.issuedBy}</p>
          <p className="text-xs text-slate-600">{item.awardDate}</p>

          <p className="text-xs text shadow-slate-500">{item.description}</p>
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Experience" : "Add Award"}
      >
        <FRow label="Award Title *">
          <Input
            value={form.title}
            onChange={f("title")}
            placeholder="Employee of the Year"
          />
        </FRow>

        
        <div className="grid grid-cols-2 gap-3">
          
          <FRow label="Issued By">
          <Input
           
            value={form.issuedBy}
            onChange={f("issuedBy")}
            placeholder="zosh private limited..."
          
          />
        </FRow>

          <FRow label="Award Date *">
            <Input
              type="date"
              value={form.awardDate}
              onChange={f("awardDate")}
            />
          </FRow>
         
        </div>

       <FRow label="Description">
          <Textarea
            value={form.description}
            onChange={f("description")}
            rows={3}
          />
        </FRow>
      </SectionDialog>
      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label={"Award "}
      />
    </div>
  );
};

export default AwardsSection;
