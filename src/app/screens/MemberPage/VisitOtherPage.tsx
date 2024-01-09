// React
import { useEffect, useState } from "react";
// Material UI Components
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
// Redux Actions and Selectors
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "../../screens/MemberPage/slice";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "../../screens/MemberPage/selector";
// Custom Components
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MemberPosts } from "./memberPosts";
import { TViewer } from "../../components/tuiEditor/TViewer";
// Utilities and API Servers
import { sweetFailureProvider } from "../../../lib/sweetAlert";
import CommunityApiServer from "../../apiServer/communityApiServer";
import MemberApiServer from "../../apiServer/memberApiServer";
// Types
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

// Redux Selector
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

export function VisitOtherPage(props: any) {
  // Initializations
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());

  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");

  // Handlers
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className={"menu_name"}>My Articles</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
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
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value="2">
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers actions_enabled={false} />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
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
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value="3">
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={false} />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
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
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Chosen Article</Box>
                  <Box className={"menu_content"}>
                    <TViewer text={`<h3>Hello</h3>`} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className={"order_user_img"}>
                    <img
                      className={"order_user_avatar"}
                      src={"/icons/profile.svg"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src="/icons/user_icon.svg" />
                    </div>
                  </div>
                  <span className={"order_user_name"}>John</span>
                  <span className={"order_user_prof"}>User</span>
                </Box>
                <div className={"user_media_box"}>
                  <img src="/icons/facebook.svg" />
                  <img src="/icons/instagram.svg" />
                  <img src="/icons/telegram.svg" />
                  <img src="/icons/youtube.svg" />
                </div>
                <Box className={"user_media_box"}>
                  <p className="follows">Followers: 3</p>
                  <p className="follows">Following: 3</p>
                </Box>
                <p>Some bio information about the user</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  marginTop={"10px"}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={(e) => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Follow the user
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
              <Box className={"my_page_menu"}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  style={{ flexDirection: "column" }}
                >
                  <Tab
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
                      >
                        <img src="/icons/pencil.svg" />
                        <span>Articles</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/followers.svg" />
                        <span>Followers</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/following.svg" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
