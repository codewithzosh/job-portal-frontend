import React from "react";
import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import AddButton from "./shared/AddButton";
import { useState } from "react";

import SectionCard from "./shared/SectionCard";
import SectionDialog from "./shared/SectionDialog";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";
import { Field } from "../../../components/ui/field";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";

import { Textarea } from "../../../components/ui/textarea";
import TagInput from "./shared/TagInput";
import DeleteConfirm from "./shared/DeleteConfirm";
import { projects } from "./shared/projects";
import { certifications } from "./shared/certificationData";


const certificationsData={
   name: "",
  issuingOrganization: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  credentialUrl: "",
}

export const CertificationsSection = ({resumeId,resume}) => {
    const [open, setOpen] = useState(false);
    const [delItem, setDel] = useState(null);
    const [edit, setEdit] = useState(null);
    const [form, setForm] = useState(certificationsData);
  
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
        <AddButton onClick={openAdd} label="Add Certification" />
      </div>

      {certifications.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <p className="font-semibold text-slate-900">{item.name}</p>
          <p className="text-xs text-slate-600">{item.issuingOrganization}</p>
          <p className="text-xs text-slate-600">
            {item.issueDate} - {item.expiryDate}
          </p>

         

     
            <a href={item.credentialUrl} target="_blank">
              Verify ↗
            </a>
            
        
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Experience" : "Add Certification"}
      >
        <FRow label="Certification Name *">
          <Input
            value={form.name}
            onChange={f("name")}
            placeholder="AWS Solutions Architect"
          />
        </FRow>

        <FRow label="Issuing Organization">
          <Textarea
            value={form.issuingOrganization}
            onChange={f("issuingOrganization")}
            rows={3}
          />
        </FRow>

       
        <div className="grid grid-cols-2 gap-3">
          <FRow label="Issue Date *">
            <Input
              type="date"
              value={form.issueDate}
              onChange={f("issueDate")}
            />
          </FRow>
          <FRow label="Expiry Date">
            <Input
              type="date"
              value={form.expiryDate}
              onChange={f("expiryDate")}
              disabled={form.isCurrentJob}
            />
          </FRow>
        </div>

   

       

        <div className="grid grid-cols-2 gap-3">
          <FRow label="Credential ID *">
          <Input
            value={form.credentialId}
            onChange={f("credentialId")}
            placeholder="https://…"
          />
        </FRow>
         <FRow label="Credential URL *">
          <Input
            value={form.credentialUrl}
            onChange={f("credentialUrl")}
            placeholder="https://…"
          />
        </FRow>
        </div>
      </SectionDialog>
      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label={"Certification "}
      />
    </div>
  )
}
