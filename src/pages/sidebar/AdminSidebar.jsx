import { Sparkles } from 'lucide-react';
import React from 'react'
import { ScrollArea } from '../../components/ui/scroll-area';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../reduxt-store/user/userSlice';

const AdminSidebar = ({navigation}) => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=()=>{
    
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className="relative flex flex-col bg-slate-950 transition-all duration-300 shrink-0 w-64">
      {/* Brand Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 px-4 shrink-0">
        <Link to={"/employer"} className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/40">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">ZOSHIRE.AI</p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Admin Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* navigation */}

      <ScrollArea className={"flex-1"}>
        <nav className="py-4 space-y-5 px-3">
          {navigation.map((section) => (
            <div>
              <h3 className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {section.title}
              </h3>

              {/* Nav Itemms */}
              <div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/employer/jobs"}
                    title={item.name}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all duration-150 px-3",
                          isActive?"bg-primary/90 text-white shadow-sm shadow-primary/30":
                          "text-slate-400 hover:text-white hover:bg-white/5"
                        )
                      }
                    >
                      <Icon />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}

                
              </div>
            </div>
          ))}

          <div>
            <h3 className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Logout
              </h3>
              <NavLink
              onClick={handleLogout}
                   
                    
                  
                    title={"Logout"}
                      className={
                        cn(
                          "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all duration-150 px-3",
                        
                          "text-slate-400 hover:text-white hover:bg-white/5"
                        )
                      }
                    >
                      <LogOut />
                      <span>Logout</span>
                    </NavLink>
          </div>
        </nav>
      </ScrollArea>
    </div>
  )
}

export default AdminSidebar