import React, { useEffect } from "react";
import { MonetizationOn } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
//REDUX
import { useDispatch, useSelector } from "react-redux";
// Redux's useDispatch and useSelector hooks are used
// for dispatching actions and accessing the Redux state.
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "../../screens/HomePage/slice";
import ProductApiServer from "../../apiServer/productApiServer";
import { retrieveTrendProducts } from "./selector";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

//** REDUX SLICE aka Redux Integration: */
const actionDispatch = (dispatch: Dispatch) => ({
  // is a function that maps Redux dispatch actions to a more convenient format.
  // It encapsulates the setTrendProducts action for updating the trending products in the Redux store.
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

//** REDUX SELECTOR */
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
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  // The useEffect hook is used to fetch data when the component mounts
  useEffect(() => {
    const productService = new ProductApiServer();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
      .then((data) => {
        // Upon successful data fetching, it dispatches the
        // setTrendProducts action to update the Redux state with the retrieved products.
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
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
                  : product.product_size + "size";
              return (
                <Box className="dish_box">
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className={"dish_sale"}>{size_volume}</div>
                    <div className={"view_btn"}>
                      See details{" "}
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
