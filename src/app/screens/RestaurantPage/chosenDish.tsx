import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// const chosen_list = Array.from(Array(3).keys());

export function ChosenDish() {
  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className={"chosen_dish_slider"}>
          <Swiper
            // loop={true}
            spaceBetween={10}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="dish_swiper"
          >
            return (
            <SwiperSlide>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`/others/tortilla01.jpeg`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`/others/tortilla02.jpeg`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`/others/tortilla03.jpeg`}
              />
            </SwiperSlide>
            );
          </Swiper>
          <Swiper
            // onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={50}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ width: "450px", height: "245px", marginTop: "20px" }}
            className="mySwiper"
          >
            <SwiperSlide
              style={{
                height: "107px",
                display: "flex",
              }}
            >
              <img
                src="/others/tortilla01.jpeg"
                style={{ borderRadius: "15px" }}
              />
            </SwiperSlide>
            <SwiperSlide
              style={{
                height: "107px",
                display: "flex",
              }}
            >
              <img
                src="/others/tortilla02.jpeg"
                style={{ borderRadius: "15px" }}
              />
            </SwiperSlide>
            <SwiperSlide
              style={{
                height: "107px",
                display: "flex",
              }}
            >
              <img
                src="/others/tortilla03.jpeg"
                style={{ borderRadius: "15px" }}
              />
            </SwiperSlide>
          </Swiper>
        </Stack>

        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>
              An Incredibly Delicious Sandwich
            </strong>
            <span className={"resto_name"}>Texas De Brazil</span>
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
                  <CheckBox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "white" }} />}
                    checked={false}
                  />

                  <span>100</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>1000</span>
                </div>
              </div>
            </Box>
            <p className={"dish_desc_info"}>
              Thin, flatbread made from maize or wheat commonly used in Mexican
              cuisine.
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className={"dish_price_box"}>
              <span>Price:</span>
              <span>10$</span>
            </div>
            <div className="button_box">
              <Button
                variant="contained"
                style={{ color: "#FFFFFF", background: "#1976D2" }}
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
