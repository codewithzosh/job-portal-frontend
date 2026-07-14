import { createSlice } from "@reduxjs/toolkit";
import {
  addEducation,
  addLanguage,
  addProject,
  addSkill,
  addWorkExperience,
  createResume,
  deleteEducation,
  deleteLanguage,
  deleteProject,
  deleteResume,
  deleteSkill,
  deleteWorkExperience,
  fetchMyResumes,
  fetchResumeById,
  setDefaultResume,
  updateEducation,
  updateLanguage,
  updatePersonalInfo,
  updateProject,
  updateResumeSummary,
  updateSkill,
  updateWorkExperience,
} from "./resumeThunk";
import { replaceInList } from "../utils/replaceInList";
// "new_resume-d","resume1", "resume2"
const initialState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  isActionLoading: false,
  actionError: null,
};

function registerSection(builder, { add, update, del }, key) {
  builder
    .addCase(add.pending, (state) => {
      state.isActionLoading = true;
      state.actionError = null;
    })
    .addCase(add.fulfilled, (state, { payload }) => {
      state.isActionLoading = false;
      if (state.currentResume)
        state.currentResume[key] = [
          ...(state.currentResume[key] ?? []),
          payload,
        ];
    })
    .addCase(add.rejected, (state, { payload }) => {
      state.isActionLoading = true;
      state.actionError = payload;
    });

  // update

  builder
    .addCase(update.pending, (s) => {
      s.isActionLoading = true;
      s.actionError = null;
    })
    .addCase(update.fulfilled, (s, { payload }) => {
      s.isActionLoading = false;
      if (s.currentResume?.[key]) {
        const i = s.currentResume[key].findIndex((x) => x.id === payload.id);
        if (i !== -1) s.currentResume[key][i] = payload;
      }
    })
    .addCase(update.rejected, (s, { payload }) => {
      s.isActionLoading = false;
      s.actionError = payload;
    });

  builder
    .addCase(del.pending, (s) => {
      s.isActionLoading = true;
      s.actionError = null;
    })
    .addCase(del.fulfilled, (s, { payload: id }) => {
      s.isActionLoading = false;
      if (s.currentResume?.[key])
        s.currentResume[key] = s.currentResume[key].filter((x) => x.id !== id);
    })

    .addCase(del.rejected, (s, { payload }) => {
      s.isActionLoading = false;
      s.actionError = payload;
    });
}

const resumeSlice = createSlice({
  name: "resume",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchMyResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchResumeById.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.currentResume = payload;
      })
      .addCase(fetchResumeById.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });

    builder
      .addCase(createResume.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(createResume.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        s.resumes.unshift(payload);
        if (payload.isDefault)
          s.resumes.forEach((r) => {
            if (r.id !== payload.id) r.isDefault = false;
          });
      })
      .addCase(createResume.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // setDefaultResume
    builder
      .addCase(setDefaultResume.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(setDefaultResume.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        s.resumes = s.resumes.map((r) => ({
          ...r,
          isDefault: r.id === payload.id,
        }));
      })
      .addCase(setDefaultResume.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // updateResumeSummary — returns full ResumeResponse
    builder
      .addCase(updateResumeSummary.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(updateResumeSummary.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        replaceInList(s.resumes, payload);
        if (s.currentResume?.id === payload.id) s.currentResume = payload;
      })
      .addCase(updateResumeSummary.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    const resume1 = {};

    builder
      .addCase(updatePersonalInfo.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(updatePersonalInfo.fulfilled, (s, { payload }) => {
        s.isActionLoading = false;
        if (s.currentResume?.id === payload.id) s.currentResume = payload;

        const i = s.resumes.findIndex((r) => r.id === payload.id);

        if (i !== -1)
          s.resumes[i] = {
            ...s.resumes[i],
            completionScore: payload.completionScore,
          };
      })
      .addCase(updatePersonalInfo.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    // deleteResume
    builder
      .addCase(deleteResume.pending, (s) => {
        s.isActionLoading = true;
        s.actionError = null;
      })
      .addCase(deleteResume.fulfilled, (s, { payload: id }) => {
        s.isActionLoading = false;
        s.resumes = s.resumes.filter((r) => r.id !== id);
        if (s.currentResume?.id === id) s.currentResume = null;
      })
      .addCase(deleteResume.rejected, (s, { payload }) => {
        s.isActionLoading = false;
        s.actionError = payload;
      });

    //   sections

    registerSection(
      builder,
      {
        add: addWorkExperience,
        update: updateWorkExperience,
        del: deleteWorkExperience,
      },
      "workExperiences",
    );

    registerSection(
      builder,
      { add: addEducation, update: updateEducation, del: deleteEducation },
      "educations",
    );

    registerSection(
      builder,
      { add: addSkill, update: updateSkill, del: deleteSkill },
      "skills",
    );
    registerSection(
      builder,
      { add: addProject, update: updateProject, del: deleteProject },
      "projects",
    );
    registerSection(
      builder,
      { add: addLanguage, update: updateLanguage, del: deleteLanguage },
      "languages",
    );
  },
});

export default resumeSlice.reducer
