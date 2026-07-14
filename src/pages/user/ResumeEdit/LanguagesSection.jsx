import React from "react";

import CopyFromMenu from "./shared/CopyFromMenu";
import { resumes } from "../Resumes/resumeData";
import AddButton from "./shared/AddButton";
import { useState } from "react";

import SectionDialog from "./shared/SectionDialog";
import FRow from "./shared/FRow";
import { Input } from "../../../components/ui/input";

import DeleteConfirm from "./shared/DeleteConfirm";

import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from "../../../reduxt-store/resume/resumeThunk";
import { useEffect } from "react";

const languageData = {
  languageName: "",
  proficiency: "PROFESSIONAL",
};

const LanguagesSection = ({ resumeId, resume }) => {
  const [open, setOpen] = useState(false);
  const [delItem, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState(languageData);
  const dispatch = useDispatch();
  const languages = resume.languages;

  const openEdit = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const openAdd = () => {
    setOpen(true);
    setEdit(null);
    setForm(languageData);
  };

  const save = () => {
    const thunk = edit
      ? updateLanguage({ resumeId, languageId: edit.id, data: form })
      : addLanguage({ resumeId, data: form });

    dispatch(thunk);
    console.log("save project", form);
  };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleDelete = () => {
    dispatch(deleteLanguage({ resumeId, languageId: delItem.id }));
    console.log("deleting", delItem);
  };

  const LANG_BG = {
    BASIC: "bg-slate-100 text-slate-600",
    CONVERSATIONAL: "bg-blue-50 text-blue-700",
    PROFESSIONAL: "bg-indigo-50 text-indigo-700",
    FLUENT: "bg-purple-50 text-purple-700",
    NATIVE: "bg-green-50 text-green-700",
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
        <AddButton onClick={openAdd} label="Add Language" />
      </div>

      <div className="flex flex-wrap gap-3">
        {languages.map((item) => (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border 

              ${LANG_BG[item.proficiency]}
            `}
          >
            <div>
              <p className="text-sm font-semibold">{item.languageName}</p>
              <p className="text-xs opacity-75">{item.proficiency}</p>
            </div>
            <div className="flex gap-0.5 ml-1">
              <button onClick={() => openEdit(item)}>
                <Pencil className="h-3 w-3" />
              </button>
              <button onClick={() => setDel(item)}>
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SectionDialog
        onSave={save}
        open={open}
        onClose={() => setOpen(false)}
        title={edit ? "Edit Language" : "Add Language"}
      >
        <FRow label="Language Name *">
          <Input
            value={form.languageName}
            onChange={f("languageName")}
            placeholder="English"
          />
        </FRow>

        <FRow label="Language Proficiency *">
          <Input
            value={form.proficiency}
            onChange={f("proficiency")}
            placeholder="English"
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

export default LanguagesSection;
