// React Import
import { useEffect, useState } from "react";
// Material UI Component and Icon Imports
import { Box, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Container } from "@mui/system";
// Material UI Lab Imports
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
// CSS Import
import "../../../css/orders.css";
// Local Component Imports
import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import { verifiedMemberData } from "../../apiServer/verify";
// Type Imports
import { Order } from "../../../types/order";
import { Member } from "../../../types/user";

// Redux
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "../../screens/OrdersPage/slice";
import OrderApiServer from "../../apiServer/orderApiServer";

// Redux Slice
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage(props: any) {
  // Initializations
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
      actionDispatch(useDispatch()),
    [value, setValue] = useState("1");

  useEffect(() => {
    const orderServer = new OrderApiServer();
    orderServer
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderServer
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderServer
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);

  // Handlers
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
              <PausedOrders setOrderRebuild={props.setOrderRebuild} />
              <ProcessOrders setOrderRebuild={props.setOrderRebuild} />
              <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
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
                  className={"other_user_avatar"}
                  src={
                    verifiedMemberData?.mb_image
                      ? verifiedMemberData.mb_image
                      : "/icons/user_icon.svg"
                  }
                />
                <div className={"order_user_icon_box"}>
                  <img src={"/icons/user_icon.svg"} />
                </div>
              </div>
              <span className={"order_user_name"}>
                {verifiedMemberData?.mb_nick}
              </span>
              <span className={"order_user_prof"}>
                {verifiedMemberData?.mb_type ?? "User"}
              </span>
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
                {verifiedMemberData?.mb_address ?? "No address available"}
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
