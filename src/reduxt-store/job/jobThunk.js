import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const clean = {};

      for (const [key, val] of Object.entries(params)) {
        if (val != null && val !== undefined && val !== "") {
          clean[key] = val;
        }
      }

      
      const response = await api.get("/api/jobs", { params: clean });
      console.log("jobs ------- :", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch jobs error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs.",
      );
    }
  },
);

export const fetchMyJobs = createAsyncThunk(
  "job/fetchMyJobs",
  async (companyId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/jobs//company/${companyId}`);
      console.log("fetch my jobs -------- ", data);
      return data;
    } catch (err) {
      console.log("fetch my jobs error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch jobs",
      );
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "job/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/jobs/${id}`);
      console.log("job id ", data);
      return data;
    } catch (err) {
      console.log("fetch job by id error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch job",
      );
    }
  },
);

export const createJob = createAsyncThunk(
  "job/createJob",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/jobs", payload);
      console.log("job created successfully --------- ", data);
      return data;
    } catch (err) {
      console.log("create job error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to create job",
      );
    }
  },
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/jobs/${id}`, payload);
      console.log("update job", data);
      return data;
    } catch (err) {
      console.log("update job error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to update job",
      );
    }
  },
);

export const publishJob = createAsyncThunk(
  "job/publishJob",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/jobs/${id}/publish`);
      console.log("publish job", data);
      return data;
    } catch (err) {
      console.log("publish job error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to publish job",
      );
    }
  },
);

export const closeJob = createAsyncThunk(
  "job/closeJob",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/jobs/${id}/close`);
      console.log("close job", data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to close job",
      );
    }
  },
);

export const fetchAllJobsAdmin = createAsyncThunk(
  "job/fetchAllJobsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/jobs/admin");
      console.log("jobs", data);
      return data;
    } catch (err) {
      console.log("fetch all jobs admin error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch jobs",
      );
    }
  },
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/jobs/${id}`);
      console.log("delete job", data);
      return id;
    } catch (err) {
      console.log("delete job error", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete job",
      );
    }
  },
);
