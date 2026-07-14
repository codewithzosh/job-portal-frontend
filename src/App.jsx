import { Route, Routes } from "react-router-dom";
import "./App.css";

import JobDetails from "./pages/user/jobs/JobDetails";
import Jobs from "./pages/user/jobs/Jobs";

import UserLayout from "./Layout/UserLayout";
import ApplyJob from "./pages/user/ApplyNow/ApplyJob";
// import Profile from "./pages/user/Profile/Profile";
import Application from "./pages/user/Applications/Application";
import SavedJobs from "./pages/user/SavedJob/SavedJobs";
import Profile from "./pages/user/Profile/Profile";
import EmployerLayout from "./Layout/EmployerLayout";
import Dashboard from "./pages/employer/Dashboard/Dashboard";
import EmployerJobs from "./pages/employer/Jobs/EmployerJobs";
import CreateJob from "./pages/employer/Jobs/CreateJob";
import EmployerApplications from "./pages/employer/Applicaton/EmployerApplications";

import AIScreening from "./pages/employer/AIScreening/AIScreening";
import CompanyProfile from "./pages/employer/CompanyProfile/CompanyProfile";
import AdminLayout from "./pages/admin/layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

import AdminProfile from "./pages/admin/settings/AdminProfile";
import AdminUsers from "./pages/admin/users/AdminUsers";
import Companies from "./pages/admin/companies/Companies";
import JobMetaData from "./pages/admin/jobmetadata/JobMetaData";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Resumes from "./pages/user/Resumes/Resumes";
import ResumeEdit from "./pages/user/ResumeEdit/ResumeEdit";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./reduxt-store/user/userThunk";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If the access token exists, you can dispatch an action to fetch the current user
      dispatch(fetchCurrentUser());
    }
  }, []);

  console.log("isAuthenticated ", isAuthenticated, user);
  return (
    <div>
      {isAuthenticated && user ? (
        <Routes>
          {/* user routes */}
          {user.role === "ROLE_JOB_SEEKER" ? (
            <Route element={<UserLayout />}>
              <Route path="/" element={<Jobs />} />

              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/apply/:id" element={<ApplyJob />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<Application />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/resumes/:id/edit" element={<ResumeEdit />} />
            </Route>
          ) : user.role === "ROLE_EMPLOYER" ? (
            <Route path="/" element={<EmployerLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employer/dashboard" element={<Dashboard />} />
              <Route path="/employer/jobs" element={<EmployerJobs />} />
              <Route path="/employer/jobs/create" element={<CreateJob />} />
              <Route path="/employer/jobs/:jobId/edit" element={<CreateJob isEdit={true} />} />
              <Route path="/employer/applications" element={<EmployerApplications />} />

              <Route path="/employer/ai-screening" element={<AIScreening />} />
              <Route path="/employer/company" element={<CompanyProfile />} />
            </Route>
          ) : user.role === "ROLE_ADMIN" ? (
            <Route path="/" element={<AdminLayout />}>
              <Route path="" element={<AdminDashboard />} />

              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/companies" element={<Companies />} />
              <Route path="/admin/job-meta" element={<JobMetaData />} />
              <Route path="/admin/settings" element={<AdminProfile />} />
            </Route>
          ) : (
            <Login />
          )}

          {/* admin routes */}
        </Routes>
      ) : (
        <Routes>
          {/* auth routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
