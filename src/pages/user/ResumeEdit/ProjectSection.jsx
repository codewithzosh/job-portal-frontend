import React from "react";
import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import AddButton from "./shared/AddButton";
import { useState } from "react";
import { workExperienceData } from "./shared/workExperrrrienceData";
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
  addProject,
  deleteProject,
  updateProject,
} from "../../../reduxt-store/resume/resumeThunk";
import { useEffect } from "react";

const projectData = {
  title: "",
  description: "",
  technologies: [],
  projectUrl: "",
  sourceCodeUrl: "",
  startDate: "",
  endDate: null,
  isOngoing: false,
};

const ProjectSection = ({ resumeId, resume }) => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(projectData);
  const dispatch = useDispatch();
  const projects = resume.projects;

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const openAdd = () => {
    setOpen(true);
    setEdit(null);
    setForm(projectData);
  };

  const save = () => {
    const thunk = edit
      ? updateProject({
          resumeId,
          projectId: edit.id,
          data: form,
        })
      : addProject({ resumeId, data: form });
    dispatch(thunk);
    console.log("save project", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    dispatch(deleteProject({ resumeId, projectId: delItem.id }));
    console.log("deleting", delItem);
  };

  useEffect(() => {
    if (edit) {
      setForm(edit);
    }
  }, [edit]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CopyFromMenu resumes={resumes} />
        <AddButton onClick={openAdd} label="Add Project" />
      </div>

      {projects.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-xs text-slate-600">{item.description}</p>

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

          <div className="mt-2 space-x-2">
            <a href={item.projectUrl} target="_blank">
              Demo ↗
            </a>
            <a href={item.sourceCodeUrl} target="_blank">
              Source ↗
            </a>
          </div>
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Experience" : "Add Experience"}
      >
        <FRow label="Title *">
          <Input
            value={form.title}
            onChange={f("title")}
            placeholder="E-Commerce Platform"
          />
        </FRow>

        <FRow label="Description">
          <Textarea
            value={form.description}
            onChange={f("description")}
            rows={3}
          />
        </FRow>
        <FRow label="Technologies">
          <TagInput
            tags={form.technologies}
            value={form.endDate}
            onChange={(value) => setForm({ ...form, technologies: value })}
          />
        </FRow>

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
            checked={form.isOngoing}
            onCheckedChange={(value) => setForm({ ...form, isOngoing: value })}
          />
          <Label>Ongoing Project</Label>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <FRow label="Live URL *">
            <Input
              value={form.projectUrl}
              onChange={f("projectUrl")}
              placeholder="https://…"
            />
          </FRow>
          <FRow label="Source Code URL *">
            <Input
              value={form.sourceCodeUrl}
              onChange={f("sourceCodeUrl")}
              placeholder="https://…"
            />
          </FRow>
        </div>
      </SectionDialog>
      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label={"Project "}
      />
    </div>
  );
};

export default ProjectSection;
