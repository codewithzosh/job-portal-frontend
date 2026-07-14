import { Target } from "lucide-react";
import { Briefcase } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { User } from "lucide-react";
import { FileText } from "lucide-react";
import { Bookmark } from "lucide-react";
import { ScrollText } from "lucide-react";
import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { logout } from "../../../reduxt-store/user/userSlice";
import { useDispatch } from "react-redux";



const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user}= useSelector((state) => state.auth);
  const dispatch=useDispatch()

  const handleLogout=()=>{
    dispatch(logout())
    console.log("-----------")
  }

  const isActive = (path) => location.pathname === path;
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link className="flex items-center gap-2" to={"/"}>
            <div>
              <Briefcase />
            </div>
            <span className="text-xl font-bold text-slate-900">ZOSHIRE</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to={"/jobs"}
              className={`hidden lg:block text-sm font-medium transition-colors ${
                isActive("/jobs")
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Jobs
            </Link>

            <Link
              to={"/ai-match"}
              className={` hidden lg:flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive("/ai-match")
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Target className="h-4 w-4" />
              Ai Match
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"w-56"}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div>
                      <p className="text-sm font-medium">
                        {user?.fullName || "user"}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/applications")}>
                    {" "}
                    <FileText className="mr-2 h-4 w-4" /> My Applications
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => navigate("/saved-jobs")}>
                    {" "}
                    <Bookmark className="mr-2 h-4 w-4" /> Saved Jobs
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => navigate("/resumes")}>
                    {" "}
                    <ScrollText className="mr-2 h-4 w-4" /> My Resumes
                  </DropdownMenuItem>
                   
                  
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                   <DropdownMenuItem onClick={handleLogout}>
                    {" "}
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
