import React from "react";
import { Badge } from "../../../components/ui/badge";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { Building2 } from "lucide-react";

const ProfileHeader = () => {
  const { myCompany } = useSelector((state) => state.company);

  console.log("cover image ", myCompany);
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div
        className={`h-36 w-full ${
          myCompany.coverImageUrl ? "bg-cover" : "bg-primary"
        }`}
        style={{ backgroundImage: `url(${myCompany.coverImageUrl})` }}
      ></div>

      {/* Logo + info row*/}
      <div className="px-6 pb-5">
        <div className="flex items-end gap-4 -mt-8 mb-4">
          {myCompany.logoUrl ? (
            <img
              src={myCompany.logoUrl}
              alt=""
              className="h-20 w-20 rounded-xl object-cover border-4 border-white shadow-md shrink-0"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white border-4 border-white shadow-md bg-gradient-to-br from-slate-100 to-slate-200 shrink-0">
              <Building2 className="h-9 w-9 text-slate-400" />
            </div>
          )}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className="bg-green-200 text-green-800">
              <Shield />
              Active
            </Badge>
            <Badge variant="outline" className="bg-green-200 text-green-800">
              <Shield />
              verified
            </Badge>
          </div>
        </div>

        <div>
          <h2>{myCompany.name}</h2>
          <p className="text-sm text-slate-500">{myCompany.tagline}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
            <span>{myCompany.industryType}</span>
            <span>{myCompany.companyType}</span>
            <span>{myCompany.companySize}</span>
            <span>{myCompany.foundedYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
