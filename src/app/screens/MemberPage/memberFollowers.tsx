import React, { useState } from "react";
import { Box, Button, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

const followers = [
  { mb_nick: "Adam", following: true },
  { mb_nick: "Bek", following: false },
  { mb_nick: "Anisa", following: true },
];

export function MemberFollowers(props: any) {
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
