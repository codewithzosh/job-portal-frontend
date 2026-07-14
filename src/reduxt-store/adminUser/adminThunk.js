import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"


export const fetchAllUsers = createAsyncThunk(
  "adminUser/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/users`)

      console.log("fetched users", data)
      return data
    } catch (err) {
      console.log("error",err)
      return rejectWithValue(err.response?.data?.message || "Failed to fetch application")
    }
  }
)

export const suspendUser = createAsyncThunk(
  "adminUser/suspendUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/users/${id}/suspend`)
      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to suspend user."
      )
    }
  }
)

export const activateUser = createAsyncThunk(
  "adminUser/activateUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/users/${id}/activate`)
      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate user."
      )
    }
  }
)

export const deleteUser = createAsyncThunk(
  "adminUser/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/users/${id}`)
      console.log("data",data)
      return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user."
      )
    }
  }
)