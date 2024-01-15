// Material UI Component Imports
import { Avatar, Box, Container, Stack } from "@mui/material";
import { useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveBestBoArticles,
  retrieveNewsBoArticles,
  retrieveTrendBoArticles,
} from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBestBoArticles,
  setNewsBoArticles,
  setTrendBoArticles,
} from "./slice";
import { BoArticle } from "../../../types/boArticle";
import CommunityApiService from "../../apiServer/communityApiServer";
import { TViewer } from "../../components/tuiEditor/TViewer";

// Redux Slice
const actionDispatch = (dispach: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispach(setBestBoArticles(data)),
  setTrendBoArticles: (data: BoArticle[]) => dispach(setTrendBoArticles(data)),
  setNewsBoArticles: (data: BoArticle[]) => dispach(setNewsBoArticles(data)),
});

// Redux Selector
const bestBoArticlesRetriever = createSelector(
  retrieveBestBoArticles,
  (bestBoArticles) => ({
    bestBoArticles,
  })
);
const trendBoArticlesRetriever = createSelector(
  retrieveTrendBoArticles,
  (trendBoArticles) => ({
    trendBoArticles,
  })
);
const newsBoArticlesRetriever = createSelector(
  retrieveNewsBoArticles,
  (newsBoArticles) => ({
    newsBoArticles,
  })
);

export function Recommendations() {
  // Initializations
  const { setBestBoArticles, setTrendBoArticles, setNewsBoArticles } =
      actionDispatch(useDispatch()),
    { bestBoArticles } = useSelector(bestBoArticlesRetriever),
    { trendBoArticles } = useSelector(trendBoArticlesRetriever),
    { newsBoArticles } = useSelector(newsBoArticlesRetriever);

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getBoArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setBestBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getBoArticles({
        bo_id: "all",
        page: 1,
        limit: 2,
        order: "art_likes",
      })
      .then((data) => setTrendBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getBoArticles({
        bo_id: "celebrity",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setNewsBoArticles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">Recommended Articles</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Top Views</Box>

              {bestBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/shoma.jpg";
                return (
                  <Stack className="article_box" key={article._id}>
                    <Box
                      className={"article_img"}
                      sx={{ backgroundImage: `url(${art_image_url})` }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className="article_author">
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/icons/default_img.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className="author_username">
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className="article_title">
                          {article?.art_subject}
                        </span>
                        <span className="article_desc"></span>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}

              <Box className={"article_category"} sx={{ marginTop: "10px" }}>
                Top Likes
              </Box>
              {trendBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/shoma.jpg";
                return (
                  <Stack className="article_box" key={article._id}>
                    <Box
                      className={"article_img"}
                      sx={{ backgroundImage: `url(${art_image_url})` }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className="article_author">
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/icons/default_img.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className="author_username">
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className="article_title">
                          {article?.art_subject}
                        </span>
                        <span className="article_desc"></span>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Celebrities</Box>
              {newsBoArticles?.map((article: BoArticle) => {
                return (
                  <Box className={"article_news"}>
                    <TViewer chosenSingleBoArticles={article} />
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
