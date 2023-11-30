import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Dispatch } from "@reduxjs/toolkit";

const followings = [
  { mb_nick: "Ahmad" },
  { mb_nick: "Joseph" },
  { mb_nick: "Adam" },
];

export function MemberFollowing(props: any) {
  return (
    <Stack>
      {followings.map((following) => {
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
              <span className={"username_text"}>User</span>
              <span className={"name_text"}>{following.mb_nick}</span>
            </Box>

            {props.actions_enabled && (
              <Button
                variant={"contained"}
                startIcon={
                  <img
                    src={"/icons/follow_icon.svg"}
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
                className={"follow_cancel_btn"}
              >
                Unfollow
              </Button>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
