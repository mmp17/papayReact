// Library Imports
import assert from "assert";
import moment from "moment";
// Material UI Imports
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";
// Type Imports
import { BoArticle } from "../../../types/boArticle";
// Utility and Configuration Imports
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
// API Server Import
import MemberApiServer from "../../apiServer/memberApiServer";
import { verifiedMemberData } from "../../apiServer/verify";

export function MemberPosts(props: any) {
  //Initializations
  const {
    chosenMemberBoArticles,
    setArticleRebuild,
    chosenSingleBoArticleHandler,
  } = props;
  //Handler
  const targetArticleLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiServer(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.value,
          group_type: "community",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticleRebuild(new Date());
    } catch (err: any) {
      sweetErrorHandling(err);
    }
  };

  return (
    <Box className="post_content">
      {chosenMemberBoArticles?.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image.replace(/\\/g, "/")}`
          : "/auth/default_article.svg";
        console.log(image_path);
        return (
          <Stack>
            <Link
              className={"all_article_box"}
              sx={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => chosenSingleBoArticleHandler(article._id)}
            >
              <img
                className={"all_article_img"}
                src={image_path}
                width={"35px"}
                style={{ borderRadius: "50%", backgroundSize: "cover" }}
              />
              <Box className={"all_article_container"}>
                <Box alignItems={"center"} display={"flex"}>
                  <img
                    src={
                      article?.member_data?.mb_image
                        ? `${serverApi}/${article.member_data.mb_image}`
                        : "/auth/default_user.png"
                    }
                    // src="/auth/default_user.png"
                    width={"35px"}
                    height={"35px"}
                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                  />
                  <span className={"all_article_author_user"}>
                    {article?.member_data?.mb_nick}
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
                        {moment(article?.createdAt).format("YY-MM-DD HH:mm")}
                      </span>
                      <Checkbox
                        sx={{ ml: "40px" }}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ fill: "red" }} />}
                        checked={
                          article.me_liked && article.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                        value={article._id}
                        onClick={targetArticleLikeHandler}
                      />
                      <span style={{ marginRight: "18px" }}>
                        {article?.art_likes}
                      </span>
                      <Visibility />
                      <span style={{ marginLeft: "18px" }}>
                        {article?.art_views}
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
            );
          </Stack>
        );
      })}
    </Box>
  );
}
