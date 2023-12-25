import { Badge, Box, Button, Icon, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome(props: any) {
  // Initializations
  const [count, setCount] = useState(1); //componentDidMount
  const [value, setValue] = useState(true); // componentWillUnmount
  // Handlers
  useEffect(() => {
    setCount(count + 1);
  }, [value]); // component DidUpdate

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
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/orders" activeClassName="underline">
                Orders
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Box className="hover-line">
              <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
              >
                <Badge badgeContent={3} color="secondary">
                  <img src="/icons/shopping_cart.svg" />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{ color: "#FFFFFF", background: "#1976D2" }}
                onClick={props.handleLoginOpen}
              >
                LOGIN
              </Button>
            </Box>
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
                REGISTRATION
              </Button>
            </Box>
          </Stack>
          <Box className="big_img"></Box>
        </Stack>
      </Container>
    </div>
  );
}
