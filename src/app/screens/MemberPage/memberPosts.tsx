import React, { useState } from "react";
import { Box, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function MemberPosts(props: any) {
  return (
    <Stack>
      <Link
        className={"all_article_box"}
        sx={{ textDecoration: "none" }}
        href={""}
      >
        <img
          className={"all_article_img"}
          src="/auth/default_article.svg"
          width={"35px"}
          style={{ borderRadius: "50%", backgroundSize: "cover" }}
        />
        <Box className={"all_article_container"}>
          <Box alignItems={"center"} display={"flex"}>
            <img
              src="/auth/default_user.png"
              width={"35px"}
              style={{ borderRadius: "50%", backgroundSize: "cover" }}
            />
            <span className={"all_article_author_user"}>Umar</span>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px",
            }}
          >
            <span className={"all_article_title"}>Celebrity</span>
            <span className={"all_article_desc"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
          </Box>
          <Box>
            <Box
              className={"article_share"}
              style={{ width: "100%", height: "auto" }}
            >
              <Box
                className={"article_share_main"}
                style={{
                  color: "rgb(255, 255, 255)",
                  marginLeft: "150px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "18px" }}>22-11-05 13:00</span>
                <FavoriteBorderIcon style={{ marginRight: "18px" }} />
                <span style={{ marginRight: "18px" }}>0</span>
                <VisibilityIcon />
                <span style={{ marginLeft: "18px" }}>1</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
      );
    </Stack>
  );
}
