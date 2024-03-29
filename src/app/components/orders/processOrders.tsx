// Redux Imports
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
// Material UI Imports
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
// Utilities and API Server Imports
import { serverApi } from "../../../lib/config";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiServer from "../../apiServer/orderApiServer";
import { verifiedMemberData } from "../../apiServer/verify";
// Type Import
import { Product } from "../../../types/product";

// Redux Selector
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);
let dt = new Date();

export default function ProcessOrders(props: any) {
  // Initializations
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value,
        data = { order_id: order_id, order_status: "FINISHED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Can you confirm that you have received the order?"
      );
      if (confirmation) {
        const orderServer = new OrderApiServer();
        await orderServer.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("finishOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order) => {
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
                          ${item.item_price * item.item_quantity}₩
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box blue_solid"}>
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
                <p className="data_compl">
                  {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  onClick={finishOrderHandler}
                  variant="contained"
                >
                  Finish Order
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
