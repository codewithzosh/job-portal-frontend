import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AvatarUpload from "./AvatarUpload";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { X } from "lucide-react";
import { Save } from "lucide-react";

const pct = 77;
const ProfileHeroCard = ({
  user,
  editing,
  uploading,
  onFileSelect,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <Card>
      <div
        className="h-28 bg-primary relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-primary to-primary/60"></div>
      </div>

      <CardContent className="px-6 pb-6 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-5">
          <AvatarUpload onFileSelect={onFileSelect} user={user} />

          <div className="flex-1 pb-1 z-10 bg-primary p-2 rounded-md">
            <div className="">
              <h1 className="text-xl font-bold text-slate-100">
                {user?.fullName}
              </h1>
              <p className="text-sm text-slate-100 mb-2.5">{user?.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{user?.role}</Badge>
              </div>
            </div>
          </div>

          {!editing ? (
            <Button onClick={onEdit} className={"py-5"}>
              <Edit2 className="h-4 w-4 mr-1.5" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                onClick={onCancel}
                className={"py-5"}
                onClick={onCancel}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={onSave} className={"py-5"}>
                <Save className="h-4 w-4 mr-1.5" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* completion bar */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Profile Completion
            </span>
            <span className={`text-sm font-bold text-primary`}>{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 bg-primary`}
              style={{ width: `${pct}%` }}
            ></div>
          </div>

          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
              add Profile Photo
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeroCard;
