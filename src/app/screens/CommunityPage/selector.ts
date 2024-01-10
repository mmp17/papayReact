// Redux Toolkit Import
import { createSelector } from "reselect";
// Type Import
import { AppRootState } from "../../../types/screen";

const selectCommunityPage = (state: AppRootState) => state.communityPage;

export const retrieveTargetBoArticles = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.targetBoArticles
);
