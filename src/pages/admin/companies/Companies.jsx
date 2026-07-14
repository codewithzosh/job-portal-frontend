import React from "react";
import SatateCard from "../../employer/Applicaton/SatateCard";
import { useMemo } from "react";
import { Building2 } from "lucide-react";
import { Clock } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Ban } from "lucide-react";
import CompanyFilter from "./CompanyFilter";
import CompanyTable from "./CompanyTable";

const companies = [
  {
    id: 1,
    name: "Zosh Technologies Pvt Ltd",
    slug: "zosh-technologies-pvt-ltd",
    tagline: "Building scalable microservices & modern web apps",
    description:
      "Zosh Technologies is a software company focused on building high-performance, scalable microservices architectures, SaaS platforms, and developer-focused products.",
    logoUrl:
      "https://cdn.pixabay.com/photo/2020/09/19/23/42/architecture-5585737_1280.jpg",
    coverImageUrl:
      "https://cdn.pixabay.com/photo/2022/12/28/21/10/night-7683839_1280.jpg",
    website: "https://www.zosh.com",
    email: "contact@zosh.com",
    phone: "+91-9876543210",
    foundedYear: 2022,
    companySize: "SMALL",
    companyType: "PRIVATE",
    industryType: "TECHNOLOGY",
    status: "ACTIVE",
    verified: true,
    active: true,
    ownerId: 2,
    socialLinks: [
      {
        platform: "LINKEDIN",
        url: "https://linkedin.com/company/zosh-technologies",
      },
      {
        platform: "TWITTER",
        url: "https://twitter.com/zoshtech",
      },
      {
        platform: "INSTAGRAM",
        url: "https://instagram.com/zoshtech",
      },
      {
        platform: "FACEBOOK",
        url: "https://facebook.com/zoshtech",
      },
    ],
    createdAt: "2026-02-28T22:36:05.549626",
    updatedAt: "2026-06-20T10:47:10.395877",
    verifiedAt: "2026-03-01T20:18:04.272877",
  },
];
const Companies = () => {
  const stats = useMemo(() => {
    const total = companies.length;
    const pending = companies.filter(
      (c) => c.status === "PENDING_VERIFICATION",
    ).length;
    const active = companies.filter((c) => c.status === "ACTIVE").length;
    const suspended = companies.filter((c) => c.status === "SUSPENDED").length;
    const rejected = companies.filter((c) => c.status === "REJECTED").length;
    return { total, pending, active, suspended, rejected };
  }, [companies]);

  const summaryCards = [
    {
      label: "Total Companies",
      value: stats.total,
      icon: Building2,
      color: "text-brand bg-blue-50",
    },
    {
      label: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Active & Verified",
      value: stats.active,
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Suspended",
      value: stats.suspended,
      icon: Ban,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">
          Company Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, verify, and manage all registered companies
        </p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <SatateCard
            key={index}
            label={card.label}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </section>
      <CompanyFilter/>
      <CompanyTable companies={companies}/>
    </div>
  );
};

export default Companies;
