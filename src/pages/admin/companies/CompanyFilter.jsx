import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const COMPANY_STATUSES = [
  { value: "all", label: "All Status" },
  { value: "PENDING_VERIFICATION", label: "Pending Verification" },
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "REJECTED", label: "Rejected" },
];

const COMPANY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "STARTUP", label: "Startup" },
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC_LISTED", label: "Public Listed" },
  { value: "GOVERNMENT", label: "Government" },
  { value: "NON_PROFIT", label: "Non-Profit" },
  { value: "EDUCATIONAL", label: "Educational" },
  { value: "SELF_EMPLOYED", label: "Self Employed" },
];

const INDUSTRY_TYPES = [
  { value: "all", label: "All Industries" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "FINANCE_BANKING", label: "Finance & Banking" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "EDUCATION", label: "Education" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "RETAIL_ECOMMERCE", label: "Retail & E-Commerce" },
  { value: "MEDIA_ENTERTAINMENT", label: "Media & Entertainment" },
  { value: "CONSULTING", label: "Consulting" },
  { value: "TELECOMMUNICATIONS", label: "Telecommunications" },
  { value: "PHARMACEUTICAL", label: "Pharmaceutical" },
  { value: "OTHER", label: "Other" },
];
const CompanyFilter = ({ onStatusFilter, onTypeFilter, onIndustryFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      <Select onValueChange={(value) => onStatusFilter?.(value)}>
        <SelectTrigger className="h-9 w-full sm:w-40 bg-white border-slate-200 text-sm rounded-lg">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          {COMPANY_STATUSES.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onTypeFilter?.(value)}>
        <SelectTrigger className="h-9 w-full sm:w-40 bg-white border-slate-200 text-sm rounded-lg">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {COMPANY_TYPES.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onIndustryFilter?.(value)}>
        <SelectTrigger className="h-9 w-full sm:w-40 bg-white border-slate-200 text-sm rounded-lg">
          <SelectValue placeholder="All Industries" />
        </SelectTrigger>
        <SelectContent>
          {INDUSTRY_TYPES.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyFilter;
