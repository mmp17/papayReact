// React Import
import React, { useEffect } from "react";
// React Router Import
import { useHistory } from "react-router-dom";
// Material UI Component and Icon Imports
import { Box, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
// Redux's useDispatch and useSelector hooks are used for dispatching actions and accessing the Redux state.
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "../../screens/HomePage/slice";
import { retrieveTrendProducts } from "./selector";
// API Server & Utility Imports
import ProductApiServer from "../../apiServer/productApiServer";
import { serverApi } from "../../../lib/config";
// Type Import
import { Product } from "../../../types/product";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  // is a function that maps Redux dispatch actions to a more convenient format.
  // It encapsulates the setTrendProducts action for updating the trending products in the Redux store.
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

// Redux Selector
// selector created using createSelector from reselect
// to efficiently retrieve trending products from the Redux state.
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function BestDishes() {
  // Initializations
  const history = useHistory(),
    { setTrendProducts } = actionDispatch(useDispatch()),
    { trendProducts } = useSelector(trendProductsRetriever);
  // The useEffect hook is used to fetch data when the component mounts
  useEffect(() => {
    const productServer = new ProductApiServer();
    productServer
      .getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
      .then((data) => {
        // Upon successful data fetching, it dispatches the
        // setTrendProducts action to update the Redux state with the retrieved products.
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handlers
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Famous Dishes</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            {/* Rendering Trending Products: */}
            {trendProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              // The size or volume of the product is dynamically determined based on the product_collection property.
              const size_volume =
                product.product_collection === "drink"
                  ? product.product_volume + "l"
                  : product.product_size + " Size";
              return (
                <Box className="dish_box">
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className={"dish_sale"}>{size_volume}</div>
                    <div
                      className={"view_btn"}
                      onClick={() => chosenDishHandler(product._id)}
                    >
                      See details
                      <img
                        src={"/icons/arrow_right.svg"}
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className={"dish_desc"}>
                    <span className={"dish_title_text"}>
                      {product.product_name}
                    </span>
                    <span className={"dish_desc_text"}>
                      <MonetizationOn />
                      {product.product_price}
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
