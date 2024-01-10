// React Core Import
import { useEffect, useState } from "react";
// React Router Import
import { useParams } from "react-router-dom";
// Material UI Component and Icon Imports
import { Box, Button, Container, Rating, Stack, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// Local Component Import
import Marginer from "../../components/marginer";
// Redux Imports
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  retrieveChosenProduct,
  retrieveChosenRestaurant,
} from "../../screens/RestaurantPage/selector";
import {
  setChosenProduct,
  setChosenRestaurant,
} from "../../screens/RestaurantPage/slice";
// API Server Imports
import ProductApiServer from "../../apiServer/productApiServer";
import RestaurantApiServer from "../../apiServer/restaurantApiServer";
import MemberApiServer from "../../apiServer/memberApiServer";
// Utility and Configuration Imports
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// Type Imports
import { Product } from "../../../types/product";
import { Restaurant } from "../../../types/user";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant[]) =>
    dispatch(setChosenRestaurant(data)),
});

// Redux Selector
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);

// const chosen_list = Array.from(Array(3).keys());

export function ChosenDish(props: any) {
  // Initializations
  let { dish_id } = useParams<{ dish_id: string }>();
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(
      useDispatch()
    ),
    { chosenProduct } = useSelector(chosenProductRetriever),
    { chosenRestaurant } = useSelector(chosenRestaurantRetriever),
    label = { inputProps: { "aria-label": "Checkbox demo" } },
    [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiServer(),
        product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);

      const restaurantService = new RestaurantApiServer(),
        restaurant = await restaurantService.getChosenRestaurant(
          product.restaurant_mb_id
        );
      setChosenRestaurant(restaurant);
    } catch (err) {
      console.log(`dishRelatedProcess ERROR:`, err);
    }
  };

  //  Handlers
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

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

  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);

  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className={"chosen_dish_slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="dish_swiper"
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={`/others/tortilla01.jpeg`}
                    alt="Dish 1"
                  />
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`/others/tortilla02.jpeg`}
                alt="Dish 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`/others/tortilla03.jpeg`}
                alt="Dish 3"
              />
            </SwiperSlide>
          </Swiper>

          <Swiper
            // onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={chosenProduct?.product_images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ width: "450px", height: "245px", marginTop: "20px" }}
            className="mySwiper"
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide
                  style={{
                    height: "107px",
                    display: "flex",
                  }}
                >
                  <img src={image_path} style={{ borderRadius: "15px" }} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>
              {chosenProduct?.product_name}
            </strong>
            <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    checked={
                      chosenProduct?.me_liked &&
                      chosenProduct?.me_liked[0]?.my_favorite
                    }
                  />

                  <span>{chosenProduct?.product_likes}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEye sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className={"dish_desc_info"}>
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "no describtion"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className={"dish_price_box"}>
              <span>Price:</span>
              <span>{chosenProduct?.product_price}₩</span>
            </div>
            <div className="button_box">
              <Button
                variant="contained"
                style={{ color: "#FFFFFF", background: "#1976D2" }}
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
