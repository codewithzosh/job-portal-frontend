import React from "react";
import CopyFromMenu from "./shared/CopyFromMenu";
import AddButton from "./shared/AddButton";
import { useState } from "react";
import { resumes } from "../Resumes/resumeData";
import SectionCard from "./shared/SectionCard";

import SectionDialog from "./shared/SectionDialog";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";

import DeleteConfirm from "./shared/DeleteConfirm";

import { Progress } from "../../../components/ui/progress";
import { useDispatch } from "react-redux";
import {
  addSkill,
  deleteSkill,
  updateSkill,
} from "../../../reduxt-store/resume/resumeThunk";
import { useEffect } from "react";

const skillsData = {
  skillName: "",
  proficiencyLevel: "INTERMEDIATE",
  yearsOfExperience: 0,
};

const skill_pr = {
  BEGINNER: 20,
  ELEMENTARY: 40,
  INTERMEDIATE: 60,
  ADVANCED: 80,
  EXPERT: 100,
};

export const PROFICIENCY_LEVELS = [
  "BEGINNER",
  "ELEMENTARY",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
];

const SkillsSection = ({ resumeId, resume }) => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(skillsData);
  const skills = resume.skills;
  const dispatch = useDispatch();

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const openAdd = () => {
    setOpen(true);
    setEdit(null)
    setForm(skillsData)
  };

  const save = () => {
    const thunk = edit
      ? updateSkill({ resumeId, skillId: edit.id, data: form })
      : addSkill({ resumeId, data: form });

    dispatch(thunk);
    console.log("save skills", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    dispatch(deleteSkill({resumeId,skillId:delItem.id}))
    console.log("deleting", delItem);
  };

   useEffect(() => {
      if (edit) {
        setForm(edit);
      }
    }, [edit]);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <CopyFromMenu resumes={resumes} />
        <AddButton onClick={openAdd} label="Add Skill" />
      </div>

      {skills.map((item) => (
        <SectionCard
          key={item.id}
          item={item}
          onEdit={openEdit}
          onDelete={setDel}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-slate-900">{item.skillName}</p>
            <p className="text-xs text-slate-600">{item.proficiencyLevel}</p>
          </div>

          <Progress
            value={skill_pr[item.proficiencyLevel]}
            className="w-fulls"
          />

          <p className="text-xs mt-0.5">
            {item.yearsOfExperience} yr
            {item.yearsOfExperience !== 1 ? "s" : ""}
          </p>
        </SectionCard>
      ))}

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Skill" : "Add Skill"}
      >
        <FRow label={"Skill Name *"}>
          <Input
            value={form.skillName}
            onChange={f("skillName")}
            placeholder="e.g. React"
          />
        </FRow>
        <div className="grid grid-cols-2 gap-3">
          <FRow label={"Proficiency Level *"}>
            <select
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              value={form.proficiencyLevel}
              onChange={f("proficiencyLevel")}
            >
              {PROFICIENCY_LEVELS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FRow>

          <FRow label={"Years of Experience"}>
            <Input
              type="number"
              min={0}
              max={50}
              value={form.yearsOfExperience}
              onChange={f("yearsOfExperience")}
              placeholder="3"
            />
          </FRow>
        </div>
      </SectionDialog>

      <DeleteConfirm
        open={!!delItem}
        onClose={() => setDel(null)}
        onConfirm={handleDelete}
        label="skill"
      />
    </div>
  );
};

export default SkillsSection;
