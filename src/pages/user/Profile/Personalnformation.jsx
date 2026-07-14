import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Personalnformation = ({ editing, user, form, onFormChange }) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className={"pb-3"}>
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-4 w-4 text-brand" /> Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className={"space-y-5"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* full name */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Full Name:
            </Label>
            {editing ? (
              <Input placeholder="Your full name" value={form.fullName}
                onChange={(e) => onFormChange({ fullName: e.target.value })} className="focus-visible:ring-primary focus-visible:border-primary" />
            ) : (
              <p className="text-sm text-slate-600 py-2">{user?.fullName}</p>
            )}
          </div>

          {/* email */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Email:
            </Label>

            <p className="text-sm text-slate-600 py-2">{user?.email}</p>
          </div>
        </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* phone */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              phone:
            </Label>
            {editing ? (
              <Input placeholder="Your phone number" onChange={(e) => onFormChange({ phone: e.target.value })} value={form.phone} className="focus-visible:ring-primary focus-visible:border-primary" />
            ) : (
              <p className="text-sm text-slate-600 py-2">{user?.phone}</p>
            )}
          </div>

          {/* Profle Image */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Profile Image:
            </Label>

        {user?.profileImage?<>
          <img
            src={user.profileImage}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
        </>:(
          <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-8 w-8 text-slate-400" />
          </div>
        )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Personalnformation;
