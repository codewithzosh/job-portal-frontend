import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useState } from "react";
import { useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

import { Button } from "../../../components/ui/button";
import { useDispatch } from 'react-redux';
import { createTag, updateTag } from '../../../reduxt-store/jobMeta/jobMetaThunk';

const TagFormDialog = ({
      isEdit,
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const dispatch=useDispatch()

     const [form, setForm] = useState({
        name: "",
        category: "",
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();

        if(initialData){
          dispatch(updateTag({
            id:initialData.id,
            ...form
          }))
        }else dispatch(createTag(form))
        console.log("form data", form);
      };
    
      useEffect(() => {
        if (open) {
          setForm({
            name: initialData?.name ?? "",
            category: initialData?.category ?? ""
       
          });
        }
        console.log("intialdata ",initialData?.category)
      }, [open, initialData]);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Tag"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700">
              Tag Name <span>*</span>
            </Label>
            <Input
              placeholder="e.g Software Engineering"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          

         

          <div className="flex gap-2">
            <Button
              type="button"
              className={"flex-1"}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className={"flex-1"} onClick={onClose}>
              {isEdit ? "Save Changes" : "Create Tag"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TagFormDialog