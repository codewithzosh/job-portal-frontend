import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AccountSecurityCard = ({ user }) => {
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
              Role
            </Label>

            <p className="text-sm text-slate-600 py-2">{user?.role}</p>
          </div>

          {/* email */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Account Status:
            </Label>

            <p className="text-sm text-slate-600 py-2">{user?.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* phone */}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Sign-in Method:
            </Label>

            <p className="text-sm text-slate-600 py-2">Email & Password</p>
          </div>

      

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Email Verified:
            </Label>

            <p>Not Verified</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSecurityCard;
