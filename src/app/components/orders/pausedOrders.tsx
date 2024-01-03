import React from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

// Redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiServer from "../../apiServer/orderApiServer";

// Redux Selector
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export default function PausedOrders(props: any) {
  // Initializations
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  // Handlers
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm("Do you want to cancel the order?");
      if (confirmation) {
        const orderServer = new OrderApiServer();
        await orderServer.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Can you confirm payment of your order?"
      );
      if (confirmation) {
        const orderServer = new OrderApiServer();
        await orderServer.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>{item.item_price}₩</p>
                        <img src={"/icons/Close.svg"} />
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          {item.item_price * item.item_quantity}₩
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box black_solid"}>
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
                <Button
                  value={order._id}
                  onClick={deleteOrderHandler}
                  variant="contained"
                  color={"secondary"}
                >
                  Cancel Order
                </Button>
                <Button
                  value={order._id}
                  onClick={processOrderHandler}
                  variant="contained"
                >
                  Pay
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
