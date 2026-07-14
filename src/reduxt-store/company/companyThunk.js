import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const fetchMyCompany = createAsyncThunk(
  "company/fetchMyCompany",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/companies/my");
      console.log("Fetched company:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch company error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company."
      );
    }
  }
);


// ── Employer: create company ────────────────────────────────────────────────

export const createCompany = createAsyncThunk(
  "company/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/companies", payload)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create company")
    }
  }
)


// ── Employer: update company ────────────────────────────────────────────────

export const updateCompany = createAsyncThunk(
  "company/update",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/companies/${id}`, payload)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update company")
    }
  }
)


// ── Fetch all companies (admin: with optional filters) ─────────────────────

export const fetchAllCompanies = createAsyncThunk(
  "company/fetchAll",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = {}
      if (filters.companyType) params.companyType = filters.companyType
      if (filters.industryType) params.industryType = filters.industryType
      if (filters.status) params.status = filters.status


      const { data } = await api.get("/api/companies", { params })
      console.log("Fetch All Companies", data)
      return data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch companies"
      )
    }
  }
)

// ── Fetch single company ────────────────────────────────────────────────────

export const fetchCompanyById = createAsyncThunk(
  "company/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/companies/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch company"
      )
    }
  }
)


// ── Admin: verify company ───────────────────────────────────────────────────

export const verifyCompany = createAsyncThunk(
  "company/verify",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/companies/${id}/verify`)
      return data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to verify company"
      )
    }
  }
)

// ── Admin: deactivate / suspend company ────────────────────────────────────

export const deactivateCompany = createAsyncThunk(
  "company/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/companies/${id}/deactivate`)
      return data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to deactivate company"
      )
    }
  }
)

// ── Admin: delete company ───────────────────────────────────────────────────

export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/companies/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete company"
      )
    }
  }
)