// React
import { useEffect, useState } from "react";
import assert from "assert";
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
  ArrowBack,
  ArrowForward,
  Facebook,
  Instagram,
  Telegram,
  Settings,
  YouTube,
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
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import { TViewer } from "../../components/tuiEditor/TViewer";
// Utilities and API Servers
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiServer from "../../apiServer/communityApiServer";
import MemberApiServer from "../../apiServer/memberApiServer";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServer/verify";
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

export function VisitMyPage(props: any) {
  // Initializations
  const [value, setValue] = useState<string>("1"),
    { setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle } =
      actionDispatch(useDispatch()),
    { chosenMember } = useSelector(chosenMemberRetriever),
    { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever),
    { chosenMemberBoArticles } = useSelector(chosenMemberBoArticlesRetriever),
    [memberArticleObj, setMemberArticleObj] = useState<SearchMemberArticlesObj>(
      {
        mb_id: "none",
        page: 1,
        limit: 4,
      }
    ),
    [rebuildArticle, setArticleRebuild] = useState<Date>(new Date()),
    [followRebuild, setFollowRebuild] = useState<Date>(new Date()),
    [valuePage, setValuePage] = useState<number>(1);
  // Hooks
  useEffect(() => {
    if (!verifiedMemberData) {
      sweetFailureProvider("Please! Login first", true, true);
    }
    const communityService = new CommunityApiServer();
    communityService
      .chosenMemberCommunityArticles(memberArticleObj)
      // setChosenMemberBoArticles
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err.message));
    const memberService = new MemberApiServer();
    memberService
      .getChosenMember(verifiedMemberData?._id)
      // setChosenMember
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err.message));
  }, [memberArticleObj, rebuildArticle]);

  // Handlers
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  // renderChosenArticleHandler
  const handleChangePagination = (e: any, value: number) => {
    memberArticleObj.page = value;
    setMemberArticleObj({ ...memberArticleObj });
    setValuePage(value);
  };
  // chosenSingleBoArticleHandler
  const chosenSingleBoArticleHandler = async (id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const communityService = new CommunityApiServer();
      await communityService
        .chosenSingleBoArticle(id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err.message));
    } catch (err: any) {
      sweetErrorHandling(err);
    }
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
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      setArticleRebuild={setArticleRebuild}
                      chosenSingleBoArticleHandler={
                        chosenSingleBoArticleHandler
                      }
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={
                            memberArticleObj.page >= 3
                              ? memberArticleObj.page + 1
                              : 3
                          }
                          page={valuePage}
                          onChange={handleChangePagination}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBack,
                                next: ArrowForward,
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
                    <MemberFollowers
                      actions_enabled={true}
                      mb_id={verifiedMemberData?._id}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    ></Stack>
                  </Box>
                </TabPanel>

                <TabPanel value="3">
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={true}
                      mb_id={verifiedMemberData?._id}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    ></Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Write article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticleRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Chosen article</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>

                <TabPanel value="6">
                  <Box className={"menu_name"}>Change Profile Information</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("6")} className={"settings_btn"}>
                  <Settings />
                </a>
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
                      className={"other_user_avatar"}
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember.mb_image}`
                          : "/auth/default_user.png"
                      }
                      alt="image"
                    />
                    <div className={"order_user_icon_box"}>
                      <img
                        src={
                          chosenMember?.mb_type === "RESTAURANT"
                            ? "/icons/restaurant.svg"
                            : "/icons/user_icon.svg"
                        }
                      />
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {chosenMember?.mb_nick}
                  </span>
                  <span className={"order_user_prof"}>
                    {chosenMember?.mb_type}
                  </span>
                </Box>
                <div className={"user_media_box"}>
                  <Facebook />
                  <Instagram />
                  <Telegram />
                  <YouTube />
                </div>
                <Box className={"user_media_box"}>
                  <p className="follows">
                    Followers: {chosenMember?.mb_subscriber_cnt}
                  </p>
                  <p className="follows">
                    Following: {chosenMember?.mb_follow_cnt}
                  </p>
                </Box>
                <p>
                  {chosenMember?.mb_description ?? "No additional information"}
                </p>
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
                      component={() => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Write Article
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
              <Box className={"my_page_menu"}>
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  style={{
                    flexDirection: "column",
                    width: "90%",
                  }}
                >
                  <Tab
                    value={"1"}
                    component={() => (
                      <div
                        className={`menu_box `}
                        onClick={() => setValue("1")}
                      >
                        <img src="/icons/pencil.svg" />
                        <span>My Articles</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box `}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/followers.svg" />
                        <span>My Followers</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box `}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/following.svg" />
                        <span>My Followings</span>
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
