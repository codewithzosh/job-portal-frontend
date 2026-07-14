import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


// category thunks

export const fetchCategories = createAsyncThunk(
  "jobMeta/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/job-categories");
      console.log("Fetched categories:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch categories error:", error.response?.data);
      return rejectWithValue(

        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  }
);


export const createCategory = createAsyncThunk(
  "jobMeta/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/job-categories", payload);
    //   console.log("Fetched categories:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch categories error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  }
);


export const updateCategory = createAsyncThunk(
  "jobMeta/updateCategory",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/job-categories/${id}`, payload)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category.")
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "jobMeta/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/job-categories/${id}`)
      console.log("Deleted category:", data);
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category.")
    }
  }
)

// skill thunks

export const fetchSkills = createAsyncThunk(
  "jobMeta/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/job-skills")
      console.log("skills ",data)
      return data
    } catch (error) {
      console.log("error",error)
      return rejectWithValue(error.response?.data?.message || "Failed to fetch skills.")
    }
  }
)


export const createSkill = createAsyncThunk(
  "jobMeta/createSkill",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/job-skills", payload)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create skill.")
    }
  }
)

export const updateSkill = createAsyncThunk(
  "jobMeta/updateSkill",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/job-skills/${id}`, payload)
      console.log("skill updated",data)
      return data
    } catch (error) {
      console.log("error ",updateSkill)
      return rejectWithValue(error.response?.data?.message || "Failed to update skill.")
    }
  }
)

export const deleteSkill = createAsyncThunk(
  "jobMeta/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/job-skills/${id}`)
        console.log("delete skill:", data);
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete skill.")
    }
  }
)


// tag thunks

export const fetchTags = createAsyncThunk(
  "jobMeta/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/job-tags")
      console.log("tags", data)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tags.")
    }
  }
)

export const createTag = createAsyncThunk(
  "jobMeta/createTag",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/job-tags", payload)
      console.log("Created tag:", data);
      return data

    } catch (error) {

      return rejectWithValue(error.response?.data?.message || "Failed to create tag.")
    }
  }
)

export const updateTag = createAsyncThunk(
  "jobMeta/updateTag",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/job-tags/${id}`, payload)

      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update tag.")
    }
  }
)

export const deleteTag = createAsyncThunk(
  "jobMeta/deleteTag",
  async (id, { rejectWithValue }) => {
    try {
      const {data}=await api.delete(`/api/job-tags/${id}`)
      console.log("delete tag",data)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete tag.")
    }
  }
)

