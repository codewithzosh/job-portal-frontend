import { createSlice } from "@reduxjs/toolkit";
import {
  closeJob,
  createJob,
  deleteJob,
  fetchAllJobsAdmin,
  fetchJobById,
  fetchJobs,
  fetchMyJobs,
  publishJob,
  updateJob,
} from "./jobThunk";
import { replaceInList } from "../utils/replaceInList";



const initialState = {
  jobs: [],
  jobLoading: false,
  jobError: null,
  adminJobs: [],
  adminJobLoading: false,
  myJobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
  actionError: null,
  isActionLoading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.jobs = action.payload;
        state.jobError = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload;
      });

    // ── fetchAllJobsAdmin ─────────────────────────────────────────────────────
    builder
      .addCase(fetchAllJobsAdmin.pending, (s) => {
        s.adminJobsLoading = true;
        s.jobsError = null;
      })
      .addCase(fetchAllJobsAdmin.fulfilled, (s, { payload }) => {
        s.adminJobsLoading = false;
        s.adminJobs = payload;
        s.jobsError = null;
      })
      .addCase(fetchAllJobsAdmin.rejected, (s, { payload }) => {
        s.adminJobsLoading = false;
        s.jobsError = payload;
      });

    // ── fetchMyJobs ───────────────────────────────────────────────────────────
    builder
      .addCase(fetchMyJobs.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchMyJobs.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.myJobs = payload;
        s.jobError = null;
      })
      .addCase(fetchMyJobs.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.jobError = payload;
      });

    // ── fetchJobById ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchJobById.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchJobById.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.currentJob = payload;
      })
      .addCase(fetchJobById.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    //   [new_created_job, job1, job2, job3]

    // job2
    // job1

    // ── createJob ─────────────────────────────────────────────────────────────
    builder
      .addCase(createJob.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(createJob.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        s.myJobs.unshift(payload);
        s.currentJob = payload;
      })
      .addCase(createJob.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── updateJob ─────────────────────────────────────────────────────────────
    builder
      .addCase(updateJob.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(updateJob.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        s.currentJob = payload;
        replaceInList(s.myJobs, payload);
      })
      .addCase(updateJob.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── publishJob ────────────────────────────────────────────────────────────
    builder
      .addCase(publishJob.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(publishJob.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        replaceInList(s.myJobs, payload);
        if (s.currentJob?.id === payload.id) s.currentJob = payload;
      })
      .addCase(publishJob.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── closeJob ──────────────────────────────────────────────────────────────
    builder
      .addCase(closeJob.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(closeJob.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        replaceInList(s.myJobs, payload);
        if (s.currentJob?.id === payload.id) s.currentJob = payload;
      })
      .addCase(closeJob.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── deleteJob ─────────────────────────────────────────────────────────────
    builder
      .addCase(deleteJob.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(deleteJob.fulfilled, (s, { payload: deletedId }) => {
        s.isActionLoading = false;
        s.myJobs = s.myJobs.filter((j) => j.id !== deletedId);
        if (s.currentJob?.id === deletedId) s.currentJob = null;
      })
      .addCase(deleteJob.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });
  },
});


export default jobSlice.reducer;
