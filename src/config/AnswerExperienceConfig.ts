export const AnswerExperienceConfig = {
  limit: 4,
  locale: "en",
  apiKey: "a7da2d9674223332b4dcc7f7d19e57b1",
  verticalKey: "locations",
  experienceKey: "five-belo",
  experienceVersion: "STAGING",
  locationRadius: 80004672,
  sessionTrackingEnabled: true,
  endpoints: {
    universalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  },
};
