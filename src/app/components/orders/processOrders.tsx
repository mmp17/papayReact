import React from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

let dt = new Date();

const processOrders = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

export default function ProcessOrders(props: any) {
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.map((item) => {
                  const image_path = `/others/tortilla02.jpeg`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>Sikh Kebab</p>
                      <Box className={"priceBox"}>
                        <p>₩10</p>
                        <img src={"/icons/Close.svg"} />
                        <p>3</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>₩30</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box blue_solid"}>
                <Box className={"boxTotal"}>
                  <p>Product Price</p>
                  <p>₩30</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>Delivery Price</p>
                  <p>₩2</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total Price</p>
                  <p>₩32</p>
                </Box>
                <p className="data_compl">2022-11-04 23:19</p>
                <Button variant="contained">Finish Order</Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
