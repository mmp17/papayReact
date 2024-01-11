// React
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import assert from "assert";
// Material UI Components
import { Box, Button, Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveMemberFollowings } from "../../screens/MemberPage/selector";
import { setMemberFollowings } from "../../screens/MemberPage/slice";
// Utility and API Server Imports
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import FollowApiServer from "../../apiServer/followApiServer";
import { verifiedMemberData } from "../../apiServer/verify";
import { serverApi } from "../../../lib/config";
import { Definer } from "../../../lib/Definer";
// Type Imports
import { FollowSearchObj, Following } from "../../../types/follow";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

// Redux Selector
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

export function MemberFollowing(props: any) {
  // Initializations
  const { actions_enabled, mb_id, followRebuild, setFollowRebuild } = props,
    history = useHistory(),
    { setMemberFollowings } = actionDispatch(useDispatch()),
    { memberFollowings } = useSelector(memberFollowingsRetriever),
    [followingSearchObj, setFollowingSearchObj] = useState<FollowSearchObj>({
      page: 1,
      limit: 4,
      mb_id: mb_id,
    });

  //Hook
  useEffect(() => {
    const followService = new FollowApiServer();
    followService
      .getMemberFollowings(followingSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err.message));
  }, [followingSearchObj, followRebuild]);

  //Handlers
  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const followService = new FollowApiServer();
      await followService.unsubscribe(id);
      sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err: any) {
      sweetErrorHandling(err);
    }
  };
  const handleChangePagination = (e: any, newValue: number) => {
    followingSearchObj.page = newValue;
    setFollowingSearchObj({ ...followingSearchObj });
  };
  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following.follow_member_data.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : "auth/default_user.png";
        return (
          <Stack className={"following_list"}>
            <div
              className={"member_img"}
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(following?.follow_id)}
            >
              <img alt="image" className={"member_avatar"} src={image_url} />
            </div>
            <Box
              style={{
                marginLeft: "25px",
                width: "400px",
                height: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className={"username_text"}>
                {following.follow_member_data.mb_type}
              </span>
              <span
                className={"name_text"}
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              >
                {following.follow_member_data.mb_nick}
              </span>
            </Box>

            {actions_enabled && (
              <Button
                variant={"contained"}
                startIcon={
                  <img
                    src={"/icons/follow_icon.svg"}
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className={"follow_cancel_btn"}
                onClick={(e) => unsubscribeHandler(e, following.follow_id)}
              >
                Unfollow
              </Button>
            )}
          </Stack>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className="bottom_box">
          <Pagination
            count={
              followingSearchObj.page >= 3 ? followingSearchObj.page + 1 : 3
            }
            page={followingSearchObj.page}
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
    </Stack>
  );
}
