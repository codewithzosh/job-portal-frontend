import { createSlice } from "@reduxjs/toolkit";
import { fetchMySavedJobs, saveJob, unsaveJob } from "./saveJobThunk";

const initialState = {
  savedJobs: [],
  savedJobMap: {},
  isLoading: false,
  error: null,
};

const savedJobSlice = createSlice({
  name: "savedJob",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySavedJobs.pending, (state) => {
        ((state.isLoading = true), (state.error = null));
      })
      .addCase(fetchMySavedJobs.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.savedJobs = action.payload));
      })
      .addCase(fetchMySavedJobs.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    // ── saveJob ───────────────────────────────────────────────────────────────
    builder
      .addCase(saveJob.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(saveJob.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.savedJobs.unshift(payload);
        s.savedJobMap[payload.jobId] = payload.id;
      })
      .addCase(saveJob.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    builder
      .addCase(unsaveJob.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(unsaveJob.fulfilled, (s, { payload: deletedId }) => {
        s.isLoading = false;
        const removed = s.savedJobs.find((sj) => sj.id === deletedId);
        if (removed) delete s.savedJobMap[removed.jobId];
        s.savedJobs = s.savedJobs.filter((sj) => sj.id !== deletedId);
      })
      .addCase(unsaveJob.rejected, (s, { payload }) => {
        s.Loading = false;
        s.error = payload;
      });
  },
});

export default savedJobSlice.reducer;
