import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchMyResumes = createAsyncThunk(
  "resume/fetchMyResumes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/resumes/my");
      console.log("Fetched resumes:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch resumes error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resumes.",
      );
    }
  },
);

export const fetchResumeById = createAsyncThunk(
  "resume/fetchResumeById",
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/resumes/${resumeId}`);
      console.log("Fetched resume by id:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch resumes error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resumes.",
      );
    }
  },
);

export const createResume = createAsyncThunk(
  "resume/createResume",
  async (payload, { rejectWithValue }) => {
    try {
      const {data}= (await api.post("/api/resumes", payload));
      console.log("resume created",data)
      return data
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to create resume",
      );
    }
  },
);

export const setDefaultResume = createAsyncThunk(
  "resume/setDefaultResume",
  async (resumeId, { rejectWithValue }) => {
    try {
      return (await api.patch(`/api/resumes/${resumeId}/set-default`)).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to set default resume",
      );
    }
  },
);

export const updateResumeSummary = createAsyncThunk(
  "resume/updateResumeSummary",
  async ({ resumeId, summary }, { rejectWithValue }) => {
    try {
      return (
        await api.patch(`/api/resumes/${resumeId}/summary`, null, {
          params: { summary },
        })
      ).data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update summary",
      );
    }
  },
);

export const updatePersonalInfo = createAsyncThunk(
  "resume/updatePersonalInfo",
  async ({ resumeId, data }, { rejectWithValue }) => {
    try {
      return (await api.put(`/api/resumes/${resumeId}/personal-info`, data))
        .data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update personal info",
      );
    }
  },
);

export const deleteResume = createAsyncThunk(
  "resume/deleteResume",
  async (resumeId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/resumes/${resumeId}`);

      console.log("Deleted resume:", data);
      return resumeId;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to delete resume",
      );
    }
  },
);

function makeSection(name, path, idParam) {
  const add = createAsyncThunk(
    `resume/add${name}`,

    async ({ resumeId, data }, { rejectWithValue }) => {
      try {
        const response = await api.post(
          `/api/resumes/${resumeId}/${path}`,
          data,
        );

        console.log("added ", name, response.data);

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || `Failed to add ${name}`,
        );
      }
    },
  );

  const update = createAsyncThunk(
    `resume/update${name}`,

    async ({ resumeId, [idParam]: itemId, data }, { rejectWithValue }) => {
      try {
        const response = await api.put(
          `/api/resumes/${resumeId}/${path}/${itemId}`,
          data,
        );

        console.log("updated ", name, response.data);

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || `Failed to update ${name}`,
        );
      }
    },
  );

  const del = createAsyncThunk(
    `resume/delete${name}`,
    async ({ resumeId, [idParam]: itemId }, { rejectWithValue }) => {
      try {
        const { data } = await api.delete(
          `/api/resumes/${resumeId}/${path}/${itemId}`,
        );
        console.log("deleted ", name, data);
        return itemId;
      } catch (e) {
        return rejectWithValue(
          e.response?.data?.message || `Failed to delete ${name}`,
        );
      }
    },
  );

  return { add, update, del };
}

const workExperienceSection = makeSection(
  "WorkExperience",
  "work-experiences",
  "workExperienceId",
);

export const addWorkExperience = workExperienceSection.add;
export const updateWorkExperience = workExperienceSection.update;
export const deleteWorkExperience = workExperienceSection.del;

const educationSection = makeSection("Education", "educations", "educationId");
export const addEducation = educationSection.add;
export const updateEducation = educationSection.update;
export const deleteEducation = educationSection.del;

const skillSection = makeSection("Skill", "skills", "skillId");
export const addSkill = skillSection.add;
export const updateSkill = skillSection.update;
export const deleteSkill = skillSection.del;

const projectSection = makeSection("Project", "projects", "projectId");
export const addProject = projectSection.add;
export const updateProject = projectSection.update;
export const deleteProject = projectSection.del;

const languageSection = makeSection("Language", "languages", "languageId");
export const addLanguage = languageSection.add;
export const updateLanguage = languageSection.update;
export const deleteLanguage = languageSection.del;
