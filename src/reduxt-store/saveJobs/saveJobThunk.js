import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const fetchMySavedJobs = createAsyncThunk(
  "savedJob/fetchMySavedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/preferences/saved-jobs");
      console.log("Fetched saved jobs:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch job error:", error.response?.data);
      return rejectWithValue(

        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  }
);


export const saveJob = createAsyncThunk(
  "savedJob/save",
  async ({ jobId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/preferences/saved-jobs", {jobId})
      console.log("saved job success ",data)
      return data
    } catch (err) {
      console.log("error ",err)
      return rejectWithValue(err.response?.data?.message || "Failed to save job")
    }
  }
)

export const unsaveJob = createAsyncThunk(
  "savedJob/unsave",
  async (savedJobId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/preferences/saved-jobs/${savedJobId}`)
      return savedJobId
    } catch (err) {
      console.log("error ",err)
      return rejectWithValue(err.response?.data?.message || "Failed to remove saved job")
    }
  }
)
