// Material UI Component Imports
import { Avatar, Box, Container, Stack } from "@mui/material";

export function Recommendations() {
  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px" }}
        style={{ position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">Recommended Articles</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Top Views</Box>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(http://45.13.132.208:3003/uploads/community/acae3a19-9099-40dd-afec-d3307d86ecc4.jpeg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className="article_main_info">
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.png"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className={"author_username"}>Joseph</span>
                    </div>
                    <span className={"article_title"}>
                      Fresh Flavors, Modern Twist!
                    </span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(http://45.13.132.208:3003/uploads/community/acae3a19-9099-40dd-afec-d3307d86ecc4.jpeg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className="article_main_info">
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.png"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className={"author_username"}>Adam</span>
                    </div>
                    <span className={"article_title"}>
                      "A Culinary Experience"
                    </span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
              <Box className={"article_category"} sx={{ marginTop: "10px" }}>
                Top Likes
              </Box>
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(http://45.13.132.208:3003/uploads/community/acae3a19-9099-40dd-afec-d3307d86ecc4.jpeg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className="article_main_info">
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.png"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className={"author_username"}>Max</span>
                    </div>
                    <span className={"article_title"}>
                      Delicious Samarkand Plow
                    </span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(http://45.13.132.208:3003/uploads/community/acae3a19-9099-40dd-afec-d3307d86ecc4.jpeg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className="article_main_info">
                    <div className={"article_author"}>
                      <Avatar
                        alt="Author_photo"
                        src={"/auth/default_user.png"}
                        sx={{ width: "35px", height: "35px" }}
                      />
                      <span className={"author_username"}>John</span>
                    </div>
                    <span className={"article_title"}>
                      "Discover Unexplored Flavors"
                    </span>
                    <p className={"article_desc"}></p>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Celebrities</Box>
              <Box className={"article_news"}>
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
              <Box className={"article_news"}>
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
