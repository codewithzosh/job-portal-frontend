import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
        const response=await api.post("/auth/login", credentials);


        if(response.data.jwt){
            localStorage.setItem("accessToken", response.data.jwt);
        }


        console.log("response ",response.data)

        return response.data;
        
    } catch (error) {
        console.log("error ",error)
      return rejectWithValue(error.response?.data?.message || "Failed to login user.");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
        const response=await api.post("/auth/signup", credentials);


        if(response.data.jwt){
            localStorage.setItem("accessToken", response.data.jwt);
        }


        console.log("response ",response.data)

        return response.data;
        
    } catch (error) {
        console.log("error ",error)
      return rejectWithValue(error.response?.data?.message || "Failed to register user.");
    }
  },
);


export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile");
      console.log("Fetched user profile:", response.data);
      return response.data;
    } catch (error) {
      console.log("Fetch user profile error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile."
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updatedUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/users/profile",data);
      console.log("updated user profile:", response.data);
      return response.data;
    } catch (error) {
      console.log("updated user profile error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user profile."
      );
    }
  }
);




