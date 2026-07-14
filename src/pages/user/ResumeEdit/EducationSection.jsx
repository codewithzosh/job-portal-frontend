import React from "react";
import CopyFromMenu from "./shared/CopyFromMenu";
import AddButton from "./shared/AddButton";
import { useState } from "react";
import { resumes } from "../Resumes/resumeData";
import SectionCard from "./shared/SectionCard";

import SectionDialog from "./shared/SectionDialog";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Field } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import TagInput from "./shared/TagInput";
import DeleteConfirm from "./shared/DeleteConfirm";
import { useDispatch } from "react-redux";
import {
  addEducation,
  deleteEducation,
  updateEducation,
  updateWorkExperience,
} from "../../../reduxt-store/resume/resumeThunk";
import { useEffect } from "react";

const educationData = {
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  grade: "",
  startDate: "",
  endDate: "",
  isCurrentlyStudying: false,
  description: "",
};

const EducationSection = ({ resumeId, resume }) => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(educationData);
  const educations = resume.educations;

  const dispatch = useDispatch();

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const openAdd = () => {
    setOpen(true);
    setEdit(null);
  };

  const save = () => {
    const payload = {
      ...form,
      endDate: form.isCurrentlyStudying ? null : form.endDate || null,
    };
    const thunk = edit
      ? updateEducation({
          resumeId,
          educationId: edit.id,
          data: payload,
        })
      : addEducation({ resumeId, data: payload });

    dispatch(thunk);
    console.log("save education", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    dispatch(deleteEducation({resumeId,educationId:delItem.id}))
    console.log("deleting", delItem);
  };

  console.log("edit", edit);

  useEffect(() => {
    if (edit) {
      setForm(edit);
    }
  }, [edit]);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <CopyFromMenu resumes={resumes} />
        <AddButton onClick={openAdd} label="AddExperience" />
      </div>

      {educations.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <p className="font-semibold text-slate-900">{item.degree}</p>
          <p className="text-xs text-slate-600">
            {item.fieldOfStudy}
            {item.fieldOfStudy && `. ${item.fieldOfStudy}`}
          </p>
          <p className="text-xs text-slate-600">
            {item.startDate} - {item.isCurrentJob ? "Present" : item.endDate}
            {item.grade && `. GPA: ${item.grade}`}
          </p>
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => {
          setOpen(false);
          setEdit(null);
          setForm(educationData)
        }}
        title={edit ? "Edit Education" : "Add Education"}
      >
        <FRow label={"Institution *"}>
          <Input
            value={form.institutionName}
            onChange={f("institutionName")}
            placeholder="University of California"
          />
        </FRow>
        <div className="grid grid-cols-2 gap-3">
          <FRow label={"Degree *"}>
            <Input
              value={form.degree}
              onChange={f("degree")}
              placeholder="B.S. Computer Science"
            />
          </FRow>

          <FRow label={"Field of Study"}>
            <Input
              value={form.fieldOfStudy}
              onChange={f("fieldOfStudy")}
              placeholder="Computer Science"
            />
          </FRow>
        </div>

        <div className="grid grid-cols-3 gap-3">
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
              disabled={form.isCurrentlyStudying}
            />
          </FRow>
          <FRow label="Grade / GPA">
            <Input
              value={form.grade}
              onChange={f("grade")}
              placeholder="3.8/4.0"
            />
          </FRow>
        </div>

        <Field orientation="horizontal">
          <Checkbox
            checked={form.isCurrentlySudying}
            onCheckedChange={(value) =>
              setForm({ ...form, isCurrentJob: value })
            }
          />
          <Label>Currently studying</Label>
        </Field>

        <div className="space-y-1">
          <Label>Description</Label>

          <Textarea
            value={form.description}
            onChange={f("description")}
            rows={3}
            placeholder="Thesis, honours, activities…"
          />
        </div>
      </SectionDialog>

      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label="education"
      />
    </div>
  );
};

export default EducationSection;
