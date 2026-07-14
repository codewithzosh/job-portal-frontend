import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchCompanyApplications = createAsyncThunk(
  "application/fetchCompanyApplications",
  async ( filters = {} , { rejectWithValue }) => {
    try {
      const params = {};

      if (filters.jobId!="all") params.jobId = filters.jobId;
      if (filters.status) params.status = filters.status;
      if (filters.isStarred != null) params.isStarred = filters.isStarred;
      if (filters.aiShortlistStatus)
        params.aiShortlistStatus = filters.aiShortlistStatus;
      if (filters.minAiScore != null) params.minAiScore = filters.minAiScore;
      if (filters.sortBy) params.sortBy = filters.sortBy;

      console.log("params -------- ",params,filters)



      const response = await api.get("/api/applications/company",{
        params
      });

      console.log("Fetched applications:", response.data);

      return response.data;
    } catch (error) {
      console.log("Fetch application error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories.",
      );
    }
  },
);


export const fetchJobApplications = createAsyncThunk(
  "application/fetchJobApplications",
  async (jobId, { rejectWithValue }) => {
    try {
      


      const response = await api.get(`/api/applications/job/${jobId}`);

      console.log("Fetche job applications:", response.data);

      return response.data;
    } catch (error) {
      console.log("Fetch application error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories.",
      );
    }
  },
);

export const fetchApplicationById = createAsyncThunk(
  "application/fetchApplicationById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/applications/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch application")
    }
  }
)

// ── Update application status ─────────────────────────────────────────────────

export const updateApplicationStatus = createAsyncThunk(
  "application/updateApplicationStatus",
  async ({ id, status, note }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/applications/${id}/status`, { status, note })
      console.log("status updated successfully --------- ",data)
      return data
    } catch (err) {
      console.log("err",err)
      return rejectWithValue(err.response?.data?.message || "Failed to update status")
    }
  }
)

// ── Toggle star ───────────────────────────────────────────────────────────────

export const toggleStar = createAsyncThunk(
  "application/toggleStar",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/applications/${id}/star`)
      console.log("toggle star",data)
      return data
    } catch (err) {
      console.log("err ".err)
      return rejectWithValue(err.response?.data?.message || "Failed to toggle star")
    }
  }
)

// ── Candidate: fetch own applications ─────────────────────────────────────────

export const fetchMyApplications = createAsyncThunk(
  "application/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/applications/my")
      console.log("my applications --- ",data)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch applications")
    }
  }
)

// ── Candidate: withdraw application ──────────────────────────────────────────

export const withdrawApplication = createAsyncThunk(
  "application/withdraw",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/applications/${id}/withdraw`, { reason })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to withdraw application")
    }
  }
)


// ── Candidate: submit application ─────────────────────────────────────────────

export const submitApplication = createAsyncThunk(
  "application/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/applications", payload)
      console.log("application submited successfully")
      return data
    } catch (err) {
      console.log("err",err)
      return rejectWithValue(err.response?.data?.message || "Failed to submit application")
    }
  }
)

// ── Notes ─────────────────────────────────────────────────────────────────────

export const addNote = createAsyncThunk(
  "application/addNote",
  async ({ applicationId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/api/applications/${applicationId}/notes`, { content })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add note")
    }
  }
)

export const deleteNote = createAsyncThunk(
  "application/deleteNote",
  async ({ applicationId, noteId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/applications/${applicationId}/notes/${noteId}`)
      return noteId
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete note")
    }
  }
)
