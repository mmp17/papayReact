import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";

export function NavbarHome(props: any) {
  // Initializations
  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papay.svg" alt="papay-pic" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent="space-evenly"
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/restaurant" activeClassName="underline">
                Restaurants
              </NavLink>
            </Box>
            {props.verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>
            {props.verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={props.cartItems}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
            />
            {!props.verifiedMemberData ? (
              <Box>
                <Button
                  variant="contained"
                  style={{ color: "#FFFFFF", background: "#1976D2" }}
                  onClick={props.handleLoginOpen}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={props.verifiedMemberData.mb_image}
                onClick={props.handleLogoutClick}
              />
            )}

            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '"',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack className="head_information" justifyContent={"row"}>
          <Stack
            justifyContent={"column"}
            style={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="/icons/welcome.svg" />
            </Box>
            <Box className="define_restaurant">
              Papays - Revolutionizing Your Dining Experience with Every
              Delivery
            </Box>
            <Box className="timeline_service">
              Welcome to Papay, the ultimate online food delivery platform where
              convenience, variety, and exceptional culinary experiences
              converge. In today's fast-paced world, Papay understands the value
              of your time and the importance of a delicious meal, which is why
              we are dedicated to bringing your favorite dishes from the best
              local restaurants directly to your doorstep.{" "}
            </Box>
            <Box sx={{ mt: "90px" }}>
              {!props.verifiedMemberData ? ( // login buganda signup button yoqoladi
                <Button
                  variant="contained"
                  style={{
                    width: "210px",
                    height: "60px",
                    background: "#1976D2",
                    color: "#FFFFFF",
                  }}
                  onClick={props.handleSignupOpen}
                >
                  Registration
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className="big_img"></Box>
        </Stack>
      </Container>
    </div>
  );
}
