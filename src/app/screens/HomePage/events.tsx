import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "Welcome to Boyin Food",
      desc: "Fresh Flavors, Modern Twist: A Culinary Experience",
      author: "Al-Majid",
      date: "2022/09/12",
      location: "6A Marghilan Streen, Tashkent",
      img: "/restaurant/boyinfood.jpg",
    },
    {
      title: "Big Discounts, Now at Bellissimod",
      desc: "Authentic Pizza Week: June 25-31, 2023 Exclusive!",
      author: "Bellissimo",
      date: "2022/09/12",
      location: "10B Chilanzar 15, Tashkent",
      img: "/restaurant/belissimo.jpg",
    },
    {
      title: "A Unique Taste Adventure Awaits!",
      desc: "Get 50% off with promo code Merhaba",
      author: "Chicken House",
      date: "2022/09/12",
      location: "10C Yunusabad 19, Tashkent",
      img: "/restaurant/merhaba.jpg",
    },
    {
      title: "A new approach is now in Uzbekistan",
      desc: "The largest wholesale market in Uzbekistan",
      author: "Food city",
      date: "2022/09/12",
      location: "10C Center 19, Tashkent",
      img: "/restaurant/food_city.jpg",
    },
  ];

  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Events</span>
          </Box>
          <Box className={"prev_next_frame"}>
            <img
              src={"/icons/arrow_right.svg"}
              className={"swiper-button-next"}
              style={{ transform: "rotate(-180deg)" }}
            />
            <div className={"dot_frame_pagination swiper-pagination"}></div>
            <img
              src={"/icons/arrow_right.svg"}
              className={"swiper-button-next"}
            />
          </Box>
          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className={"events_info_frame"}>
                  <div className="events_img">
                    <img src={value.img} className={"events_img"} />
                  </div>
                  <Box className={"events_desc"}>
                    <Box className={"events_bott"}>
                      <Box className={"bott_left"}>
                        <div className={"event_title_speaker"}>
                          <strong>{value.title}</strong>
                          <div className={"event_organizator"}>
                            <img
                              src={"/icons/speaker.svg"}
                              style={{ width: "20px", marginRight: "10px" }}
                            />
                            <p className={"spec_text_author"}>{value.author}</p>
                          </div>
                        </div>

                        <p
                          className={"text_desc"}
                          style={{ marginTop: "10px" }}
                        >
                          {""} {value.desc}
                        </p>

                        <div
                          className={"bott_info"}
                          style={{ marginTop: "10px" }}
                        >
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/calendar.svg"}
                              style={{ marginRight: "10px" }}
                            />
                            {value.date}
                          </div>
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/location.svg"}
                              style={{ marginRight: "10px" }}
                            />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
