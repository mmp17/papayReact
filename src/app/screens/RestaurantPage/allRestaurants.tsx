// React Hooks Import
import { useEffect, useState, useRef } from "react";
// React Router Import
import { useHistory } from "react-router-dom";
// Material UI Component and Icon Imports
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import {
  Search,
  Favorite,
  Visibility,
  Call,
  LocationOnRounded,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
// Material UI Joy Component Imports
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
// Utility Imports
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTargetRestaurants } from "../../screens/RestaurantPage/slice";
import { retrieveTargetRestaurants } from "../../screens/RestaurantPage/selector";
// API Server Imports
import RestaurantApiServer from "../../apiServer/restaurantApiServer";
import MemberApiServer from "../../apiServer/memberApiServer";
// Utility and Configuration Imports
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { serverApi } from "../../../lib/config";
// Type Imports
import { Restaurant } from "../../../types/user";
import { SearchObj } from "../../../types/others";

// Redux Slice
// function maps Redux dispatch actions for setting target restaurants in the Redux store.
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});

// Redux Selector
// selector to retrieve target restaurants from the Redux state.
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

export function AllRestaurants() {
  // Initializations
  const { setTargetRestaurants } = actionDispatch(useDispatch()),
    { targetRestaurants } = useSelector(targetRestaurantsRetriever),
    [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
      page: 1,
      limit: 8,
      order: "mb_point",
    }),
    refs: any = useRef([]),
    //  for referencing DOM elements, particularly for updating likes count.
    history = useHistory();

  useEffect(() => {
    // hook fetches restaurant data based on the search object and updates Redux state.
    const restaurantServer = new RestaurantApiServer();
    restaurantServer
      .getRestaurants(targetSearchObject)
      .then((data) => setTargetRestaurants(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]); // componentDidUpdate

  //  Handlers
  // navigates to a specific restaurant's detail page.
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
  };

  // updates the search criteria based on selected categories.
  const searchHandler = (category: string) => {
      targetSearchObject.page = 1;
      targetSearchObject.order = category;
      setTargetSearchObject({ ...targetSearchObject });
    },
    handlePaginationChange = (event: any, value: number) => {
      targetSearchObject.page = value;
      setTargetSearchObject({ ...targetSearchObject });
    },
    targetLikeHandler = async (e: any, id: string) => {
      try {
        assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
        // The like functionality checks for member data in local storage to ensure user authentication.
        const memberService = new MemberApiServer(),
          like_result = await memberService.memberLikeTarget({
            like_ref_id: id,
            group_type: "member",
          });
        assert.ok(like_result, Definer.general_err1);

        if (like_result.like_status > 0) {
          e.target.style.fill = "red";
          refs.current[like_result.like_ref_id].innerHTML++;
        } else {
          e.target.style.fill = "white";
          refs.current[like_result.like_ref_id].innerHTML--;
        }

        await sweetTopSmallSuccessAlert("success", 700, false);
      } catch (err: any) {
        console.log("targetLikeTop, ERROR:", err);
        sweetErrorHandling(err).then();
      }
    };

  return (
    <div className="all_restaurant">
      <Container>
        <Stack>
          <Box
            className={"fill_search_box"}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className={"fill_box"}>
              <a onClick={() => searchHandler("mb_point")}>Best</a>
              <a onClick={() => searchHandler("mb_views")}>Famous</a>
              <a onClick={() => searchHandler("mb_likes")}>Trending</a>
              <a onClick={() => searchHandler("createdAt")}>New</a>
            </Box>
            <Box className={"search_big_box"}>
              <form className={"search_form"} action={""} method={""}>
                <input
                  type={"search"}
                  className={"searchInput"}
                  name={"resSearch"}
                  placeholder={"Search"}
                />
                <Button
                  className={"button_search"}
                  variant="contained"
                  endIcon={<Search />}
                ></Button>
              </form>
            </Box>
          </Box>
          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {targetRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Card
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                      cursor: "pointer",
                    }}
                    key={ele._id}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={image_path} alt="" />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="danger"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Favorite
                          onClick={(e) => targetLikeHandler(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      {ele.mb_nick} restaurant
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}
                        {/* Tashkent Yunusabad */}
                      </Link>
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link startDecorator={<Call />} textColor={"neutral.700"}>
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 1.5,
                        // px: "var(--Card--padding",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlineBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="body-md"
                        sx={{
                          fontweight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {ele.mb_views}
                        <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body-md"
                        sx={{
                          fontweight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />{" "}
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className={"bottom_box"}>
            <img className={"line_img"} src={"/restaurant/line.svg"} />
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
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
              onChange={handlePaginationChange}
            />
            <img className={"line_img_two"} src={"/restaurant/line_two.svg"} />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
