import React from "react";
import { cn } from "../../lib/utils";
import { Users } from "lucide-react";
import { CheckCircle } from "lucide-react";

const RoleButton = ({ setValue, selectedRole,name,description,role }) => {
  return (
    <button
      type="button"
      onClick={() => setValue("role", role)}
      className={cn(
        "relative flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200",
        selectedRole === role
          ? "border-primary bg-primary/5 shadow-md"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
          selectedRole === role ? "bg-primary/10" : "bg-slate-100",
        )}
      >
        <Users />
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-semibold",
            selectedRole === role
              ? "text-primary"
              : "text-slate-700",
          )}
        >
          {name}
        </p>
        <p>{description}b</p>
      </div>
     {selectedRole==role && <div className="absolute top-3 right-3 w-5 h-5 rounded-full ">
        <CheckCircle />
      </div>}
    </button>
  );
};

export default RoleButton;
