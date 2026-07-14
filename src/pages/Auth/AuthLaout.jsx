import { Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AUTH_IMAGE =
  "https://res.cloudinary.com/dcpesbd8q/image/upload/v1772374334/zosh%20hire/auth_side_image_so2r2w.png";

const indicatorsData = [
  { dot: "bg-emerald-400", text: "100K+ Jobs" },
  { dot: "bg-blue-400", text: "50K+ Companies" },
  { dot: "bg-violet-400", text: "AI-Powered" },
];
const AuthLaout = ({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="min-h-screen flex">
      {/* left */}
      <section className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden">
        <img src={AUTH_IMAGE} alt="" />

        <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

        <div className="absolute bottom-10 left-10 right-10 text-white">
          <div className="inline-flex items-center gap-2 mb-4">
            <div>
              <Sparkles />
            </div>
            <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
              JobPortal.AI
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-snug">
            {" "}
            Your next careerr move <br /> starts here.
          </h2>
          <p className="text-white/70 mt-3 text-sm leading-relaxed max-w-sm">
            AI-powered job matching, smart resume builder, and real-time
            insights — all in one place.
          </p>
          <div className="flex items-center gap-5 mt-6">
            {indicatorsData.map((item) => (
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                <span className="text-xs text-white/80 font-medium">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* right */}
      <section className="flex-1 relative overflow-hidden bg-linear-to-br from-slate-50 via-primary/5 to-slate-50">
        <div className="relative flex flex-col items-center justify-center min-h-screen p-6 sm:p-10">
          <div className="min-w-lg">
            {/* Logo */}
            <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="inline-flex items-center gap-2 group">
                <div className="text-white bg-primary p-2 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                  JobPortal <span className="text-primary">.Ai</span>
                </h1>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                AI-Powered Career Platform
              </p>
            </div>

            {/* auth card */}

            <Card className="border-slate-200/60 shadow-xl backdrop-blur-sm bg-white/80 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className={"space-y-2 pb-4"}>
                <CardTitle className="text-2xl font-bold text-center bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {title}
                </CardTitle>
                {description && (
                  <CardDescription className="text-center text-base">
                    {description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className={"pt-2"}>{children}</CardContent>
            </Card>

            <p className="text-center text-sm text-slate-600 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {footerText}

              <Link
                className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                to={footerLink}
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLaout;
