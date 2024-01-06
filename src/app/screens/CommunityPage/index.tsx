import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { TargetArticles } from "./targetArticles";
import { CommunityChats } from "./communityChats";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/community.css";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import CommunityApiServer from "../../apiServer/communityApiServer";
import { Dispatch } from "@reduxjs/toolkit";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { retrieveTargetBoArticles } from "./selector";
import { createSelector } from "reselect";
import { setTargetBoArticles } from "./slice";
// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});

// Redux Selector
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

export function CommunityPage(props: any) {
  // Initializations
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = React.useState("1");
  const [SearchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 5,
    }
  );

  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiServer();
    communityService
      .getTargetArticles(SearchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [SearchArticlesObj, articlesRebuild]);

  // Handlers
  const handleChange = (event: any, newValue: string) => {
    SearchArticlesObj.page = 1;

    switch (newValue) {
      case "1":
        SearchArticlesObj.bo_id = "all";
        break;
      case "2":
        SearchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        SearchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        SearchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...SearchArticlesObj });
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    SearchArticlesObj.page = value;
    setSearchArticlesObj({ ...SearchArticlesObj });
  };

  return (
    <div className={"community_page"}>
      <div className={"community_frame"}>
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <CommunityChats />
            <Stack
              className={"community_all_frame"}
              inputMode={"text"}
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className={"article_tabs"}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      value={value}
                      TabIndicatorProps={{ style: { background: "#1976d2" } }}
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      style={{ borderColor: "blue" }}
                    >
                      <Tab
                        label="All Articles"
                        value="1"
                        style={{ color: "#1976d2" }}
                      />
                      <Tab
                        label="Celebrities"
                        value="2"
                        style={{ color: "#1976d2" }}
                      />
                      <Tab
                        label="Restaurant Evaluations"
                        value="3"
                        style={{ color: "#1976d2" }}
                      />
                      <Tab
                        label="Stories"
                        value="4"
                        style={{ color: "#1976d2" }}
                      />
                    </TabList>
                  </Box>
                </Box>

                <Box className={"article_main"}>
                  <TabPanel value="1">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Box>

                <Box className={"article_bott"}>
                  <Pagination
                    count={
                      SearchArticlesObj.page >= 3
                        ? SearchArticlesObj.page + 1
                        : 3
                    }
                    page={SearchArticlesObj.page}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color={"secondary"}
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
