import React, { useState } from "react";
import { Container } from "@mui/system";
import { Box, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import Marginer from "../../components/marginer";
import "../../../css/orders.css";
import { Order } from "../../../types/order";
// Redux
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "../../screens/OrdersPage/slice";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage() {
  // Initializations
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  TabIndicatorProps={{ style: { background: "#1976d2" } }}
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab
                    label="Muy Orders"
                    value="1"
                    style={{ color: "#1976d2" }}
                  />
                  <Tab label="Process" value="2" style={{ color: "#1976d2" }} />
                  <Tab
                    label="Finished"
                    value="3"
                    style={{ color: "#1976d2" }}
                  />
                </TabList>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={"order_user_img"}>
                <img
                  className={"order_user_avatar"}
                  src={"/icons/ergashKarimov.jpeg"}
                />
                <div className={"order_user_icon_box"}>
                  <img src="/icons/user_icon.svg" />
                </div>
              </div>
              <span className={"order_user_name"}>Joseph</span>
              <span className={"order_user_prof"}>User</span>
            </Box>
            <div
              style={{
                border: `1px solid rgb(161, 161, 161)`,
                marginTop: "40px",
                width: "100%",
              }}
            ></div>
            <Box className={"order_user_address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec_address_txt"}>
                Yalanghoch 11A, Mirzo Ulughbek District, Tashkent
              </div>
            </Box>
          </Box>
          <Box className={"order_info_box"} marginTop={"15px"}>
            <input
              type={"text"}
              name={"card_number"}
              placeholder={"Card number: 0000 1111 2222 3333"}
              className={"card_input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type={"text"}
                name={"card_period"}
                placeholder={"07 / 24"}
                className={"card_half_input"}
              />
              <input
                type={"text"}
                name={"card_period"}
                placeholder={"07 / 24"}
                className={"card_half_input"}
              />
            </div>
            <input
              type={"text"}
              name={"card_creator"}
              placeholder={"John Doe"}
              className={"card_input"}
            />
            <div className={"cards_box"}>
              <img src="/icons/western.svg" />
              <img src="/icons/master.svg" />
              <img src="/icons/paypal.svg" />
              <img
                src="/icons/visa.svg"
                style={{ width: "40px", height: "26px" }}
              />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
