import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  createSkill,
  createTag,
  deleteCategory,
  deleteSkill,
  deleteTag,
  fetchCategories,
  fetchSkills,
  fetchTags,
  updateCategory,
  updateSkill,
  updateTag,
} from "./jobMetaThunk";
import { replaceInList } from "../utils/replaceInList";


const initialState = {
  categories: [],
  skills: [],
  tags: [],
  isLoadingCategories: false,
  isLoadingSkills: false,
  isLoadingTags: false,
  isActionLoading: false,
  error: null,
  actionError: null,
};

// [new_created, c1,c2,c3]

const jobMetaSlice = createSlice({
  name: "jobMeta",
  initialState,
  extraReducers: (builder) => {
    builder

      // fetch categories
      .addCase(fetchCategories.pending, (state) => {
        ((state.isLoadingCategories = true), (state.error = null));
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        ((state.isLoadingCategories = false), (state.error = null));
        state.categories = action.payload;
      })
      .addAsyncThunk(fetchCategories.rejected, (state, action) => {
        ((state.isLoadingCategories = false), (state.error = action.payload));
      })

      //   create category
      .addCase(createCategory.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        state.categories.unshift(payload);
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })

      //   update category
      .addCase(updateCategory.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        replaceInList(state.categories, payload);
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })
      //   [C1,C3]
      //   delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload: id }) => {
        state.isActionLoading = false;
        state.categories = state.categories.filter((c) => c.id !== id);
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      });

    //   skills

    builder
      .addCase(fetchSkills.pending, (state) => {
        state.isLoadingSkills = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, { payload }) => {
        state.isLoadingSkills = false;
        state.skills = payload;
      })
      .addCase(fetchSkills.rejected, (state, { payload }) => {
        state.isLoadingSkills = false;
        state.error = payload;
      })

      .addCase(createSkill.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(createSkill.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        state.skills.unshift(payload);
      })
      .addCase(createSkill.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })

      .addCase(updateSkill.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(updateSkill.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        replaceInList(state.skills, payload);
      })
      .addCase(updateSkill.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })

      .addCase(deleteSkill.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteSkill.fulfilled, (state, { payload: id }) => {
        state.isActionLoading = false;
        state.skills = state.skills.filter((s) => s.id !== id);
      })
      .addCase(deleteSkill.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      });

    // ── Tags ───────────────────────────────────────────────────────────────
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isLoadingTags = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, { payload }) => {
        state.isLoadingTags = false;
        state.tags = payload;
      })
      .addCase(fetchTags.rejected, (state, { payload }) => {
        state.isLoadingTags = false;
        state.error = payload;
      })

      .addCase(createTag.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(createTag.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        state.tags.unshift(payload);
      })
      .addCase(createTag.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })

      .addCase(updateTag.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(updateTag.fulfilled, (state, { payload }) => {
        state.isActionLoading = false;
        replaceInList(state.tags, payload);
      })
      .addCase(updateTag.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      })

      .addCase(deleteTag.pending, (state) => {
        state.isActionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteTag.fulfilled, (state, { payload: id }) => {
        state.isActionLoading = false;
        state.tags = state.tags.filter((t) => t.id !== id);
      })
      .addCase(deleteTag.rejected, (state, { payload }) => {
        state.isActionLoading = false;
        state.actionError = payload;
      });
  },
});

export default jobMetaSlice.reducer;
