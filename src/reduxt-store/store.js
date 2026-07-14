import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./user/userSlice";
import companyReducer from "./company/companySlice";
import jobReducer from "./job/jobSlice";
import jobMetaReducer from "./jobMeta/jobMetaSlice";
import applicationReducer from "./application/applicationSlice.js"
import savedJobReducer from "./saveJobs/savedJobSlice.js"
import resumeReducer from "./resume/resumeSlice.js"
import aiReducer from "./ai/aiSlice.js"
import adminUserReducer from "./adminUser/adminSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    job:jobReducer,
    jobMeta: jobMetaReducer,
    application: applicationReducer,
    savedJob: savedJobReducer,
    resume:resumeReducer,
    ai:aiReducer,
    adminUser:adminUserReducer
  },
});

export default store;
