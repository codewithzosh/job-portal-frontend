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
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import TagInput from "./shared/TagInput";
import DeleteConfirm from "./shared/DeleteConfirm";
import { useDispatch } from "react-redux";
import {
  addWorkExperience,
  updateEducation,
  updateWorkExperience,
} from "../../../reduxt-store/resume/resumeThunk";
import { useEffect } from "react";

export const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
  "REMOTE",
];
const experienceData = {
  companyName: "",
  companyLogoUrl: "",
  jobTitle: "",
  employmentType: "FULL_TIME",
  location: "",
  startDate: "",
  endDate: "",
  isCurrentJob: false,
  description: "",
  technologies: ["react", "spring boot", "FastAPI", "AWS"],
};

const WorkExperienceSection = ({ resumeId, resume }) => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(experienceData);
  const workExperienceData = resume.workExperiences || [];
  const dispatch = useDispatch();

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
    console.log("item",item)
  };

  const openAdd = () => {
      setEdit(null)
    setOpen(true);
    setForm(experienceData)
  
  };

  const save = () => {
    const payload = {
      ...form,
      endDate: form.isCurrentJob ? null : form.endDate || null,
    };
    const thunk = edit
      ? updateWorkExperience({
          resumeId,
          workExperienceId: edit.id,
          data: payload,
        })
      : addWorkExperience({ resumeId, data: payload });

    dispatch(thunk);
    setEdit(null)
    console.log("save work experience", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    console.log("deleting", delItem);
  };

  useEffect(() => {
    if (edit) {
      setForm(edit);
    }
  }, [edit]);

  console.log("edit",edit)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CopyFromMenu resumes={resumes} />
        <AddButton onClick={openAdd} label="AddExperience" />
      </div>

      {workExperienceData.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <p className="font-semibold text-slate-900">{item.jobTitle}</p>
          <p className="text-xs text-slate-600">
            {item.companyName}
            {item.location && `. ${item.location}`}
          </p>
          <p className="text-xs text-slate-600">
            {item.startDate} - {item.isCurrentJob ? "Present" : item.endDate}
          </p>
          {item.technologies?.length && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.technologies.map((t) => (
                <span
                  className="text-xs bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                  key={t}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Experience" : "Add Experience"}
      >
        <div className="grid grid-cols-2 gap-3">
          <FRow label={"Company *"}>
            <Input
              value={form.companyName}
              onChange={f("companyName")}
              placeholder="zosh pvt."
            />
          </FRow>

          <FRow label={"Job Title *"}>
            <Input
              value={form.jobTitle}
              onChange={f("jobTitle")}
              placeholder="Full Stack Developer"
            />
          </FRow>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FRow label={"Company *"}>
            <select
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              value={form.employmentType}
              onChange={f("employmentType")}
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FRow>

          <FRow label={"Location *"}>
            <Input
              value={form.location}
              onChange={f("location")}
              placeholder="City / Remote"
            />
          </FRow>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FRow label="Start Date *">
            <Input
              type="date"
              value={form.startDate}
              onChange={f("startDate")}
            />
          </FRow>
          <FRow label="End Date">
            <Input
              type="date"
              value={form.endDate}
              onChange={f("endDate")}
              disabled={form.isCurrentJob}
            />
          </FRow>
        </div>

        <Field orientation="horizontal">
          <Checkbox
            checked={form.isCurrentJob}
            onCheckedChange={(value) =>
              setForm({ ...form, isCurrentJob: value })
            }
          />
          <Label>Currently working here</Label>
        </Field>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label>Description</Label>
            <Button type="button" variant="ghost" size="sm">
              Generate Bullets
            </Button>
          </div>
          <Textarea
            value={form.description}
            onChange={f("description")}
            rows={3}
            placeholder="Key achievements and responsibilities…"
          />
        </div>

        <FRow label="Technologies">
          <TagInput
            tags={form.technologies}
            value={form.endDate}
            onChange={(value) => setForm({ ...form, technologies: value })}
          />
        </FRow>

        <FRow label="Company Logo URL *">
          <Input
            value={form.companyLogoUrl}
            onChange={f("companyLogoUrl")}
            placeholder="https://…"
          />
        </FRow>
      </SectionDialog>
      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label={"Work Experience "}
      />
    </div>
  );
};

export default WorkExperienceSection;
