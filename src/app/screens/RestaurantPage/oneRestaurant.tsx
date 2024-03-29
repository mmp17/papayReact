// React Core Import
import React, { useEffect, useState } from "react";
// React Router Imports
import { useHistory, useParams } from "react-router-dom";
// Material UI Component and Icon Imports
import { Box, Button, Container, Stack, Badge, Checkbox } from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  MonetizationOn,
  RemoveRedEye,
  Search,
  Star,
} from "@mui/icons-material";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
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
// API Server Imports
import MemberApiServer from "../../apiServer/memberApiServer";
import RestaurantApiServer from "../../apiServer/restaurantApiServer";
import ProductApiServer from "../../apiServer/productApiServer";
// Utility and Configuration Imports
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServer/verify";
// Type Imports
import { Product } from "../../../types/product";
import { ProductSearchObj } from "../../../types/others";
import { Restaurant } from "../../../types/user";

// Redux Slice
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

export function OneRestaurant(props: any) {
  // Initializations
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const history = useHistory(),
    { setRandomRestaurants, setChosenRestaurant, setTargetProducts } =
      actionDispatch(useDispatch()),
    { randomRestaurants } = useSelector(randomRestaurantsRetriever),
    { chosenRestaurant } = useSelector(chosenRestaurantRetriever),
    { targetProducts } = useSelector(targetRestaurantsRetriever),
    [chosenRestaurantId, setChosenRestaurantId] =
      useState<string>(restaurant_id);

  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
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
  }, [chosenRestaurantId, targetProductSearchObj, , productRebuild]);

  //  Handlers
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiServer(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p>{chosenRestaurant?.mb_nick} Restaurant</p>
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
                    endIcon={<Search />}
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
              <ArrowBackIosNew
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
              <ArrowForwardIos sx={{ fontSize: 40 }} />
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
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_price")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_likes")}
              >
                Likes
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_views")}
              >
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
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("etc")}
                >
                  others
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("dessert")}
                >
                  dessert
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("drink")}
                >
                  drinks
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("salad")}
                >
                  salad
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("dish")}
                >
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
                  <Box
                    onClick={() => chosenDishHandler(product?._id)}
                    sx={{ cursor: "pointer" }}
                    className={"dish_box"}
                    key={product._id}
                  >
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className={"view_btn"}
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
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
                            icon={<RemoveRedEye style={{ color: "white" }} />}
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
                    <Star style={{ color: "#F2BD57" }} />
                    <Star style={{ color: "#F2BD57" }} />
                    <Star style={{ color: "#F2BD57" }} />
                    <Star style={{ color: "whitesmoke" }} />
                    <Star style={{ color: "whitesmoke" }} />
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
            sx={{
              backgroundImage: `url(${serverApi}/${chosenRestaurant?.mb_image})`,
            }}
          >
            <div className={"about_left_desc"}>
              <span>{chosenRestaurant?.mb_nick}</span>
              <p>{chosenRestaurant?.mb_description}</p>
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
