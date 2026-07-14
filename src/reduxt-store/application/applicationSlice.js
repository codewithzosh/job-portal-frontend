import { createSlice } from "@reduxjs/toolkit";
import {
  addNote,
  deleteNote,
  fetchApplicationById,
  fetchCompanyApplications,
  fetchJobApplications,
  fetchMyApplications,
  toggleStar,
  updateApplicationStatus,
} from "./applicationThunk";
import { replaceInList } from "../utils/replaceInList";

const initialState = {
  applications: [],
  myApplications: [],
  currentApplication: null,
  isLoading: false,
  isActionLoding: false,
  error: null,
  actionError: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyApplications.pending, (state) => {
        ((state.isLoading = true), (state.error = null));
      })
      .addCase(fetchCompanyApplications.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.applications = action.payload));
      })
      .addCase(fetchCompanyApplications.rejected, (state, action) => {
        ((state.isLoading = false), (state.error = action.payload));
      });

    // ── fetchJobApplications ──────────────────────────────────────────────────
    builder
      .addCase(fetchJobApplications.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchJobApplications.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.applications = payload;
      })
      .addCase(fetchJobApplications.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    // ── fetchApplicationById ──────────────────────────────────────────────────
    builder
      .addCase(fetchApplicationById.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchApplicationById.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.currentApplication = payload;
      })
      .addCase(fetchApplicationById.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    builder
      .addCase(updateApplicationStatus.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        s.currentApplication = payload;
        const updated=replaceInList(s.applications, payload);
        s.applications=updated

        console.log("updated",updated)

      })
      .addCase(updateApplicationStatus.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── toggleStar ────────────────────────────────────────────────────────────
    builder
      .addCase(toggleStar.pending, (s) => {
        s.isActionLoading = true;
      })
      .addCase(toggleStar.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        replaceInList(s.applications, payload);
        if (s.currentApplication?.id === payload.id)
          s.currentApplication = payload;
      })
      .addCase(toggleStar.rejected, (s) => {
        s.isActionLoading = false;
      });

    // ── addNote ───────────────────────────────────────────────────────────────
    builder
      .addCase(addNote.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(addNote.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        if (s.currentApplication) {
          s.currentApplication.notes = [
            payload,
            ...(s.currentApplication.notes || []),
          ];
        }
      })
      .addCase(addNote.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // ── fetchMyApplications (candidate) ──────────────────────────────────────
    builder
      .addCase(fetchMyApplications.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.myApplications = payload;
      })
      .addCase(fetchMyApplications.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    builder
      .addCase(deleteNote.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(deleteNote.fulfilled, (s, { payload: noteId }) => {
        s.isActionLoading = false;
        if (s.currentApplication) {
          s.currentApplication.notes = (
            s.currentApplication.notes || []
          ).filter((n) => n.id !== noteId);
        }
      })
      .addCase(deleteNote.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });
  },
});

export default applicationSlice.reducer;
