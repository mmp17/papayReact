import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Favorite, FavoriteBorder, MonetizationOn } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

//Redux
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import RestaurantApiServer from "../../apiServer/restaurantApiServer";
import ProductApiServer from "../../apiServer/productApiServer";
import { Product } from "../../../types/product";
import { ProductSearchObj } from "../../../types/others";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import {
  setRandomRestaurants,
  setChosenRestaurant,
  setTargetProducts,
} from "../../screens/RestaurantPage/slice";
import {
  retrieveRandomRestaurants,
  retrieveChosenRestaurant,
  retrieveTargetProducts,
} from "../../screens/RestaurantPage/selector";

//** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant[]) =>
    dispatch(setChosenRestaurant(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// Redux Selectors
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);
const targetRestaurantsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

// const restaurant_list = Array.from(Array(20).keys());
// const product_list = Array.from(Array(8).keys());

export function OneRestaurant() {
  // Initializations
  const history = useHistory();
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const { setRandomRestaurants, setChosenRestaurant, setTargetProducts } =
    actionDispatch(useDispatch());

  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { targetProducts } = useSelector(targetRestaurantsRetriever);

  const [chosenRestaurantId, setChosenRestaurantId] =
    useState<string>(restaurant_id);

  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });

  useEffect(() => {
    const restaurantServer = new RestaurantApiServer();
    restaurantServer
      .getRestaurants({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomRestaurants(data))
      .catch((err) => console.log(err));

    const productServer = new ProductApiServer();
    productServer
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [targetProductSearchObj]);

  /** HANDLERS */
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };

  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p>Texas De Brazil</p>
              <Box className={"single_search_big_box"}>
                <form className={"single_search_form"} action={""} method={""}>
                  <input
                    type={"search"}
                    className={"single_searchInput"}
                    name={"single_reSearch"}
                    placeholder={"Search"}
                  />
                  <Button
                    className={"single_button_search"}
                    variant={"contained"}
                    endIcon={<SearchIcon />}
                  ></Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              />
            </Box>
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {randomRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"restaurant_avatars"}
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className={"next_btn restaurant-next"}
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            sx={{ mt: "65px" }}
          >
            <Box className={"dishs_filter_box"}>
              <Button variant={"contained"} color="secondary">
                New
              </Button>
              <Button variant={"contained"} color="secondary">
                Price
              </Button>
              <Button variant={"contained"} color="secondary">
                Likes
              </Button>
              <Button variant={"contained"} color="secondary">
                Views
              </Button>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "60px" }}
            flexDirection={"row"}
          >
            <Stack className={"dish_category_box"}>
              <div className={"dish_category_main"}>
                <Button variant={"contained"} color="secondary">
                  others
                </Button>
                <Button variant={"contained"} color="secondary">
                  dessert
                </Button>
                <Button variant={"contained"} color="secondary">
                  drinks
                </Button>
                <Button variant={"contained"} color="secondary">
                  salad
                </Button>
                <Button variant={"contained"} color="secondary">
                  dishes
                </Button>
              </div>
            </Stack>

            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const size_volume =
                  product.product_collection === "drink"
                    ? product.product_volume + "l"
                    : product.product_size + " Size";

                return (
                  <Box className={"dish_box"} key={product._id}>
                    <Box
                      className="dish_img"
                      sx={{ backgroundImage: `url(${image_path})` }}
                    >
                      <div className={"dish_sale"}>{size_volume}</div>
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color={"primary"}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button className={"view_btn"}>
                        <img
                          src={"/icons/shopping_cart.svg"}
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button
                        className={"like_view_btn"}
                        style={{ right: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>

                    <Box className={"dish_desc"}>
                      <span className={"dish_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"dish_desc_text"}>
                        <MonetizationOn />
                        {product.product_price}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className={"review_for_restaurant"}>
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Opinions about the restaurant</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className={"review_box"} key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img src={"/community/girl.png"} className={"review_img"} />
                  </Box>
                  <span className={"review_name"}>Kim Jeong Won</span>
                  <span className={"review_prof"}>User</span>
                  <p className={"review_desc"}>
                    I really like the food by this restaurant and the atmosphere
                    is very good.
                  </p>
                  <div className={"review_stars"}>
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

      <Container className="member_reviews">
        <Box className={"category_title"}>About Restaurant</Box>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className={"about_left"}
            sx={{ backgroundImage: `url(/restaurant/texas_de_brazil.jpeg)` }}
          >
            <div className={"about_left_desc"}>
              <span>Burak</span>
              <p>The most delicious cuisine!</p>
            </div>
          </Box>
          <Box className={"about_right"}>
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} flexDirection={"row"} key={index}>
                  <div className={"about_right_img"}></div>
                  <div className={"about_right_desc"}></div>
                  <span>Our skilled chefs</span>
                  <p>Our Culinary Team: Masters of the Kitchen</p>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Address</Box>
          <iframe
            style={{ marginTop: "60px", border: "0" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.8835780281747!2d69.29937721208222!3d41.33314489923764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4b9b1c6a531%3A0xdb141e6021e00414!2sKish-Mish!5e0!3m2!1sen!2skr!4v1700436171857!5m2!1sen!2skr"
            width="1320"
            height="500"
            loading="lazy"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
