// Material UI Imports
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
// Redux Imports
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
// Utility Import
import { serverApi } from "../../../lib/config";
// Type Import
import { Product } from "../../../types/product";

// Redux Selector
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export default function FinishedOrders(props: any) {
  // Initializations
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>{product?.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>{item.item_price}₩</p>
                        <img src={"/icons/Close.svg"} />
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          9${item.item_price * item.item_quantity}₩
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box red_solid"}>
                <Box className={"boxTotal"}>
                  <p>Product</p>
                  <p>{order.order_total_amount - order.order_delivery_cost}₩</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>Delivery</p>
                  <p>{order.order_delivery_cost}₩</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total Price</p>
                  <p>{order.order_total_amount}₩</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
