import React, { useState } from "react";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { Favorite, RemoveRedEye } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/auth/default_article.svg";
        const image_path = article?.member_data.mb_image
          ? `${serverApi}/${article.member_data.mb_image}`
          : "/auth/default_user.png";
        return (
          <Link
            className={"all_article_box"}
            sx={{ textDecoration: "none" }}
            href={""}
          >
            <Box
              className={"all_article_img"}
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
            <Box className={"all_article_container"}>
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={image_path}
                  alt="image"
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className={"all_article_author_user"}>
                  {article?.member_data.mb_nick}
                </span>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "15px",
                }}
              >
                <span className={"all_article_title"}>{article?.bo_id}</span>
                <span className={"all_article_desc"}>
                  {article?.art_subject}
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
                    <span style={{ marginRight: "18px" }}>
                      {moment().format("YY-MM-DD HH:mm")}
                    </span>
                    <span style={{ marginRight: "8px" }}>
                      {article?.art_likes}
                    </span>
                    <Checkbox
                      style={{ marginRight: "18px" }}
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?._id}
                      /*@ts-ignore*/
                      checked={false}
                    />

                    {/* <FavoriteBorderIcon style={{ marginRight: "18px" }} /> */}
                    <span style={{ marginRight: "8px" }}>
                      {article?.art_views}
                    </span>
                    <VisibilityIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
