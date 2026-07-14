import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useDispatch } from "react-redux";
import { updateApplicationStatus } from "../../../reduxt-store/application/applicationThunk";
import { useState } from "react";

const STATUSES = [
  { value: "PENDING", label: "Pending", color: "text-slate-600" },
  { value: "REVIEWING", label: "Reviewing", color: "text-primary" },
  { value: "SHORTLISTED", label: "Shortlisted", color: "text-indigo-600" },
  {
    value: "INTERVIEW_SCHEDULED",
    label: "Interview Scheduled",
    color: "text-violet-600",
  },
  { value: "REJECTED", label: "Rejected", color: "text-red-600" },
  { value: "HIRED", label: "Hired", color: "text-emerald-600" },
];
const UpdateStatusDialog = ({
  open,
  onClose,
  applicationId,
  currentStatus,
}) => {
    const [status,setStatus]=useState(currentStatus || "")
    const dispatch=useDispatch();


    const handleSubmit=()=>{
        dispatch(updateApplicationStatus({
            id:applicationId,
            status,
            note:"employer update status"
        }))
        onClose()
    }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-4">
            <Label>New Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="text-sm w-full">
                <SelectValue placeholder="select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusDialog;
