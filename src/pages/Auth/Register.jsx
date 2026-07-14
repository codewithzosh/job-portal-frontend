import React from "react";
import AuthLaout from "./AuthLaout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./authSchemas";
import { Label } from "../../components/ui/label";
import { User } from "lucide-react";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";

import RoleButton from "./RoleButton";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../reduxt-store/user/userThunk";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "ROLE_JOB_SEEKER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    dispatch(registerUser(data))
    console.log("register form data", data);
  };

    useEffect(() => {
      // console.log("")
      if (isAuthenticated && user) {
        
        navigate("/");
  
       
      }
    }, [isAuthenticated, user]);

  return (
    <AuthLaout
      title={"Create your account"}
      description={"Start your AI-powered job search journey"}
      footerText={"Already have an account? "}
      footerLinkText={"Login"}
      footerLink={"/login"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label>Full Name</Label>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="fullName"
              type={"fullName"}
              placeholder="zosh"
              {...register("fullName")}
              className={cn(
                "pl-10 h-11 transition-all",
                errors.fullName
                  ? "border-red-300 focus-visible:ring-red-500"
                  : "focus-visible:ring-primary focus-visible:border-primary",
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <Mail className="h-4 w-4" />
            </div>
            <Input
              id="email"
              type={"email"}
              placeholder="zosh@gmail.com"
              {...register("email")}
              className={cn(
                "pl-10 h-11 transition-all",
                errors.email
                  ? "border-red-300 focus-visible:ring-red-500"
                  : "focus-visible:ring-primary focus-visible:border-primary",
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Password</Label>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="password"
              type={"password"}
              placeholder="provide your password"
              {...register("password")}
              className={cn(
                "pl-10 h-11 transition-all",
                errors.password
                  ? "border-red-300 focus-visible:ring-red-500"
                  : "focus-visible:ring-primary focus-visible:border-primary",
              )}
            />
          </div>

          {errors.password && <p className="text-xs text-red-600 flex items-center gap-1.5 mt-1.5 animate-in slide-in-from-top-1">
            <AlertCircle className="h-3 w-3" />
            {errors.password.message}</p>}


        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="confirmPassword"
              type={"confirmPassword"}
              placeholder="confirm your password"
              {...register("confirmPassword")}
              className={cn(
                "pl-10 h-11 transition-all",
                errors.confirmPassword
                  ? "border-red-300 focus-visible:ring-red-500"
                  : "focus-visible:ring-primary focus-visible:border-primary",
              )}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Im am a</Label>
          <div className="grid grid-cols-2 gap-3">
            <RoleButton
              selectedRole={selectedRole}
              setValue={setValue}
              name={"Job Seeker"}
              description={"Find your dream job"}
              role={"ROLE_JOB_SEEKER"}
            />
            <RoleButton
              selectedRole={selectedRole}
              setValue={setValue}
              name={"employer"}
              description={"Hire top talent"}
              role={"ROLE_EMPLOYER"}
            />
          </div>
        </div>

        <Button  type="submit" className="w-full  shadow-md hover:shadow-lg">
            Register
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform"/>
        </Button>
      </form>
    </AuthLaout>
  );
};

export default Register;
