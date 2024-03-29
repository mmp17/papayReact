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
import { retrieveMemberFollowers } from "../../screens/MemberPage/selector";
import { setMemberFollowers } from "../../screens/MemberPage/slice";
// Type Imports
import { FollowSearchObj, Follower } from "../../../types/follow";
// Utility and API Server Imports
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import FollowApiServer from "../../apiServer/followApiServer";
import { serverApi } from "../../../lib/config";
import { Definer } from "../../../lib/Definer";
import { verifiedMemberData } from "../../apiServer/verify";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

// Redux Selector
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

export function MemberFollowers(props: any) {
  // Initializations
  const { actions_enabled, mb_id, followRebuild, setFollowRebuild } = props,
    history = useHistory(),
    { setMemberFollowers } = actionDispatch(useDispatch()),
    { memberFollowers } = useSelector(memberFollowersRetriever),
    [followerSearchObj, setFollowerSearchObj] = useState<FollowSearchObj>({
      page: 1,
      limit: 4,
      mb_id: mb_id,
    });

  //Hooks
  useEffect(() => {
    assert.ok(verifiedMemberData, Definer.auth_err1);
    const followService = new FollowApiServer();
    followService
      .getMemberFollowers(followerSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err.message));
  }, [followerSearchObj, followRebuild]);
  //Handlers
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const followService = new FollowApiServer();
      await followService.subscribe(id);
      sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err: any) {
      console.log(`ERROR::: subscribeHandler ${err.message}`);
      sweetErrorHandling(err);
    }
  };
  const handleChangePagination = (e: any, newValue: number) => {
    followerSearchObj.page = newValue;
    setFollowerSearchObj({ ...followerSearchObj });
  };
  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };

  return (
    <Stack>
      {memberFollowers.map((follower: Follower) => {
        const image_url = follower.subscriber_member_data.mb_image
          ? `${serverApi}/${follower.subscriber_member_data.mb_image}`
          : "auth/default_user.png";
        return (
          <Stack className={"following_list"}>
            <div
              className={"member_img"}
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(follower?.subscriber_id)}
            >
              <img className={"member_avatar"} alt="image" src={image_url} />
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
              <span className={"mb_username"}>
                {follower.subscriber_member_data?.mb_type}
              </span>
              <span
                className={"mb_name"}
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(follower?.subscriber_id)}
              >
                {follower.subscriber_member_data?.mb_nick}
              </span>
            </Box>
            {actions_enabled &&
              (follower.me_followed && follower.me_followed[0]?.my_following ? (
                <Button
                  variant={"contained"}
                  className={"following_already"}
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant={"contained"}
                  startIcon={
                    <img
                      src={"/icons/follow_icon.svg"}
                      style={{ width: "40px" }}
                    />
                  }
                  className={"follow_btn"}
                  onClick={(e) => subscribeHandler(e, follower.subscriber_id)}
                >
                  Follow Back
                </Button>
              ))}
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
            count={followerSearchObj.page >= 3 ? followerSearchObj.page + 1 : 3}
            page={followerSearchObj.page}
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
