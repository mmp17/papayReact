// External Library Imports
import assert from "assert";
import { Definer } from "../../../lib/Definer";
// Material UI Component and Icon Imports
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Utility and API Server Imports
import { serverApi } from "../../../lib/config";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiServer from "../../apiServer/memberApiServer";
// Type Import
import { BoArticle } from "../../../types/boArticle";

export function TargetArticles(props: any) {
  // Handlers
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiServer(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "community",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      props.setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
            ? `${serverApi}/${article.art_image}`
            : "/auth/default_article.svg",
          image_path = article?.member_data.mb_image
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
                  height={"35px"}
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
                    <span style={{ marginRight: "0px" }}>
                      {article?.art_likes}
                    </span>
                    <Checkbox
                      style={{ marginRight: "18px" }}
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?._id}
                      onClick={targetLikeHandler}
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
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
