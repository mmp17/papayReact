import { Box, Button, Stack } from "@mui/material";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "../../screens/MemberPage/slice";
import { Follower } from "../../../types/follow";

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

const followers = [
  { mb_nick: "Adam", following: true },
  { mb_nick: "Bek", following: false },
  { mb_nick: "Anisa", following: true },
];

export function MemberFollowers(props: any) {
  // Initializations
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  return (
    <Stack>
      {followers.map((follower) => {
        const image_url = "auth/default_user.png";
        return (
          <Stack className={"following_list"}>
            <div className={"member_img"}>
              <img className={"member_avatar"} src={image_url} />
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
              <span className={"mb_username"}>User</span>
              <span className={"mb_name"}>{follower.mb_nick}</span>
            </Box>
            {props.actions_enabled &&
              (follower.following ? (
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
                >
                  Follow Back
                </Button>
              ))}
          </Stack>
        );
      })}
    </Stack>
  );
}
