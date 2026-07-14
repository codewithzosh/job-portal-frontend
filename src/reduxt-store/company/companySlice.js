import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  deactivateCompany,
  deleteCompany,
  fetchAllCompanies,
  fetchCompanyById,
  fetchMyCompany,
  updateCompany,
  verifyCompany,
} from "./companyThunk";

const initialState = {
  myCompany: null,
  companies: [],
  currentCompany: null,
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myCompany = action.payload;
      })
      .addCase(fetchMyCompany.rejected, (state, action) => {
        state.myCompany = null;
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myCompany = payload;
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── updateCompany ─────────────────────────────────────────────────────
    builder
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myCompany = payload;

        // Sync admin list if present
        // const idx = state.companies.findIndex((c) => c.id === payload.id);
        // if (idx !== -1) state.companies[idx] = payload;
      })
      .addCase(updateCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── fetchAllCompanies ─────────────────────────────────────────────────
    builder
      .addCase(fetchAllCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.companies = payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── fetchCompanyById ──────────────────────────────────────────────────
    builder
      .addCase(fetchCompanyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentCompany = payload;
      })
      .addCase(fetchCompanyById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── verifyCompany ─────────────────────────────────────────────────────
    builder
      .addCase(verifyCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const idx = state.companies.findIndex((c) => c.id === payload.id);
        if (idx !== -1) state.companies[idx] = payload;
        if (state.currentCompany?.id === payload.id)
          state.currentCompany = payload;
      })
      .addCase(verifyCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── deactivateCompany ─────────────────────────────────────────────────
    builder
      .addCase(deactivateCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deactivateCompany.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const idx = state.companies.findIndex((c) => c.id === payload.id);
        if (idx !== -1) state.companies[idx] = payload;
        if (state.currentCompany?.id === payload.id)
          state.currentCompany = payload;
      })
      .addCase(deactivateCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });

    // ── deleteCompany ─────────────────────────────────────────────────────
    builder
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(deleteCompany.fulfilled, (state, { payload: deletedId }) => {
        state.isLoading = false;
        state.companies = state.companies.filter((c) => c.id !== deletedId);
        if (state.currentCompany?.id === deletedId) state.currentCompany = null;
      })

      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});


export default companySlice.reducer;
