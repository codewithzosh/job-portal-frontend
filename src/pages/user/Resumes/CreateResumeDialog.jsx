import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { FileText } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { useDispatch } from "react-redux";
import { createResume } from "../../../reduxt-store/resume/resumeThunk";

const CreateResumeDialog = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [isDefalut, setIsDefault] = useState();
  const dispatch=useDispatch()

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = () => {
    dispatch(createResume({
      title,
      isDefalut,
      template: "PROFESSIONAL",
      visibility: "PUBLIC",
    }))
    console.log("resume data", { title, isDefalut });
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"flex items-center gap-2"}>
            <FileText />
            Create New Resume
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label>Resume Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Backend Engineer Resume"
              maxLength={150}
            />
            <p>{title.length} / 150</p>
          </div>
          <div>
            <Field orientation="horizontal">
              <Checkbox checked={isDefalut} onCheckedChange={setIsDefault} />
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-2">
                  Set as default resume
                </FieldLabel>
                <FieldDescription>
                  Auto-selected when applying without choosing a version
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </div>
        <DialogFooter>
        <Button variant="outline" onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Resume</Button>
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
};

export default CreateResumeDialog;
