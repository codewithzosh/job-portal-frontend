import { createSlice } from "@reduxjs/toolkit";
import {
  analyzeSkillsGap,
  enhanceSearch,
  generateCoerLetter,
  generateExperienceBullets,
  generateJobBenefits,
  generateJobDescription,
  generateJobRequirements,
  generateJobResponsibilities,
  generateResumeSummary,
  getCareerFeedback,
  getResumeImprovements,
  recommendJobSkills,
  recommendJobTags,
  scoreCandidate,
  suggestSalary,
} from "./aiThunk";

const initialState = {
  coverLetter: null,
  screeningScore: null,
  skillsGap: null,
  resumeSummary: null,
  experienceBullet: null,
  resumeImprovements: null,

  // job ai
  jobDescription: null,
  jobRequirements: null,

  salarySuggestion: null,
  recommendedSkills: null,
  jobResponsibilities: null,
  jobBenefits: null,
  recommendedTags: null,

  careerFeedback: null,
  searchEnhancement: null,

  isGeneratingCoverLetter: false,
  isScoringCandidate: false,
  isGeneratingResumeSummary: false,
  isGeneratingBullets: false,
  isAnalyzingSkillsGap: false,
  isGettingImprovements: false,
  isGettingCareerFeedback: false,
  isEnhancingSearch: false,

  isGeneratingJobDescription: false,
  isGeneratingJobRequirements: false,
  isSuggestingSalary: false,
  isRecommendingSkills: false,
  isGeneratingJobResponsibilities: false,
  isGeneratingJobBenefits: false,
  isRecommendingTags: false,

  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(generateCoerLetter.pending, (state) => {
        state.isGeneratingCoverLetter = true;
        state.error = null;
      })
      .addCase(generateCoerLetter.fulfilled, (state, { payload }) => {
        ((state.isGeneratingCoverLetter = false),
          (state.coverLetter = payload));
      })
      .addCase(generateCoerLetter.rejected, (state, { payload }) => {
        ((state.isGeneratingCoverLetter = false), (state.error = payload));
      })

      // ── scoreCandidate ─────────────────────────────────────────────────────
      .addCase(scoreCandidate.pending, (s) => {
        s.isScoringCandidate = true;
        s.error = null;
      })
      .addCase(scoreCandidate.fulfilled, (s, { payload }) => {
        s.isScoringCandidate = false;
        s.screeningScore = payload;
      })
      .addCase(scoreCandidate.rejected, (s, { payload }) => {
        s.isScoringCandidate = false;
        s.error = payload;
      });

    // ── analyzeSkillsGap ───────────────────────────────────────────────────
    builder
      .addCase(analyzeSkillsGap.pending, (s) => {
        s.isAnalyzingSkillsGap = true;
        s.error = null;
      })
      .addCase(analyzeSkillsGap.fulfilled, (s, { payload }) => {
        s.isAnalyzingSkillsGap = false;
        s.skillsGap = payload;
      })
      .addCase(analyzeSkillsGap.rejected, (s, { payload }) => {
        s.isAnalyzingSkillsGap = false;
        s.error = payload;
      });

    // ── generateResumeSummary ──────────────────────────────────────────────
    builder
      .addCase(generateResumeSummary.pending, (s) => {
        s.isGeneratingResumeSummary = true;
        s.error = null;
      })
      .addCase(generateResumeSummary.fulfilled, (s, { payload }) => {
        s.isGeneratingResumeSummary = false;
        s.resumeSummary = payload;
      })
      .addCase(generateResumeSummary.rejected, (s, { payload }) => {
        s.isGeneratingResumeSummary = false;
        s.error = payload;
      });

    // ── generateExperienceBullets ──────────────────────────────────────────
    builder
      .addCase(generateExperienceBullets.pending, (s) => {
        s.isGeneratingBullets = true;
        s.error = null;
      })
      .addCase(generateExperienceBullets.fulfilled, (s, { payload }) => {
        s.isGeneratingBullets = false;
        s.experienceBullets = payload;
      })
      .addCase(generateExperienceBullets.rejected, (s, { payload }) => {
        s.isGeneratingBullets = false;
        s.error = payload;
      });

    builder
      .addCase(getResumeImprovements.pending, (s) => {
        s.isGettingImprovements = true;
        s.error = null;
      })
      .addCase(getResumeImprovements.fulfilled, (s, { payload }) => {
        s.isGettingImprovements = false;
        s.resumeImprovements = payload;
      })
      .addCase(getResumeImprovements.rejected, (s, { payload }) => {
        s.isGettingImprovements = false;
        s.error = payload;
      });

    // ── getCareerFeedback ──────────────────────────────────────────────────
    builder
      .addCase(getCareerFeedback.pending, (s) => {
        s.isGettingCareerFeedback = true;
        s.error = null;
      })
      .addCase(getCareerFeedback.fulfilled, (s, { payload }) => {
        s.isGettingCareerFeedback = false;
        s.careerFeedback = payload;
      })
      .addCase(getCareerFeedback.rejected, (s, { payload }) => {
        s.isGettingCareerFeedback = false;
        s.error = payload;
      });

    builder
      .addCase(generateJobDescription.pending, (s) => {
        s.isGeneratingJobDescription = true;
        s.error = null;
      })
      .addCase(generateJobDescription.fulfilled, (s, { payload }) => {
        s.isGeneratingJobDescription = false;
        s.jobDescription = payload;
      })
      .addCase(generateJobDescription.rejected, (s, { payload }) => {
        s.isGeneratingJobDescription = false;
        s.error = payload;
      });

    builder
      .addCase(generateJobRequirements.pending, (s) => {
        s.isGeneratingJobRequirements = true;
        s.error = null;
      })
      .addCase(generateJobRequirements.fulfilled, (s, { payload }) => {
        s.isGeneratingJobRequirements = false;
        s.jobRequirements = payload;
      })
      .addCase(generateJobRequirements.rejected, (s, { payload }) => {
        s.isGeneratingJobRequirements = false;
        s.error = payload;
      });

    builder
      .addCase(suggestSalary.pending, (s) => {
        s.isSuggestingSalary = true;
        s.error = null;
      })
      .addCase(suggestSalary.fulfilled, (s, { payload }) => {
        s.isSuggestingSalary = false;
        s.salarySuggestion = payload;
      })
      .addCase(suggestSalary.rejected, (s, { payload }) => {
        s.isSuggestingSalary = false;
        s.error = payload;
      });

    builder
      .addCase(recommendJobSkills.pending, (s) => {
        s.isRecommendingSkills = true;
        s.error = null;
      })
      .addCase(recommendJobSkills.fulfilled, (s, { payload }) => {
        s.isRecommendingSkills = false;
        s.recommendedSkills = payload;
      })
      .addCase(recommendJobSkills.rejected, (s, { payload }) => {
        s.isRecommendingSkills = false;
        s.error = payload;
      });

    builder
      .addCase(generateJobResponsibilities.pending, (s) => {
        s.isGeneratingJobResponsibilities = true;
        s.error = null;
      })
      .addCase(generateJobResponsibilities.fulfilled, (s, { payload }) => {
        s.isGeneratingJobResponsibilities = false;
        s.jobResponsibilities = payload;
      })
      .addCase(generateJobResponsibilities.rejected, (s, { payload }) => {
        s.isGeneratingJobResponsibilities = false;
        s.error = payload;
      });

    builder
      .addCase(generateJobBenefits.pending, (s) => {
        s.isGeneratingJobBenefits = true;
        s.error = null;
      })
      .addCase(generateJobBenefits.fulfilled, (s, { payload }) => {
        s.isGeneratingJobBenefits = false;
        s.jobBenefits = payload;
      })
      .addCase(generateJobBenefits.rejected, (s, { payload }) => {
        s.isGeneratingJobBenefits = false;
        s.error = payload;
      });

    builder
      .addCase(recommendJobTags.pending, (s) => {
        s.isRecommendingTags = true;
        s.error = null;
      })
      .addCase(recommendJobTags.fulfilled, (s, { payload }) => {
        s.isRecommendingTags = false;
        s.recommendedTags = payload;
      })
      .addCase(recommendJobTags.rejected, (s, { payload }) => {
        s.isRecommendingTags = false;
        s.error = payload;
      });

    builder
      .addCase(enhanceSearch.pending, (s) => {
        s.isEnhancingSearch = true;
        s.error = null;
      })
      .addCase(enhanceSearch.fulfilled, (s, { payload }) => {
        s.isEnhancingSearch = false;
        s.searchEnhancement = payload;
      })
      .addCase(enhanceSearch.rejected, (s, { payload }) => {
        s.isEnhancingSearch = false;
        s.error = payload;
      });
  },
});


export default aiSlice.reducer
