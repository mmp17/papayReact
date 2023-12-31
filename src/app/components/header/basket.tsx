import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import OrderApiServer from "../../apiServer/orderApiService";
import { useHistory } from "react-router-dom";

export default function Basket(props: any) {
  // Initializations
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const itemsPrice = (cartItems || []).reduce(
    (a: any, c: CartItem) => a + c.price * c.quantity,
    0
  );
  console.log("itemsPrice", itemsPrice);
  const shippingPrice = itemsPrice > 10000 ? 0 : 4000;
  const totalPrice = itemsPrice + shippingPrice;

  // Handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = async () => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const order = new OrderApiServer();
      await order.createOrder(cartItems);

      onDeleteAll();
      handleClose();

      history.push("/orders");
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping_cart.svg"} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
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
        <Stack className={"basket_frame"}>
          <Box className={"all_check_box"}>
            {false ? <div>Cart is empty!</div> : <div>My Cart Products:</div>}
          </Box>

          <Box className={"orders_main_wrapper"}>
            <Box className={"orders_wrapper"}>
              {cartItems?.map((item: CartItem) => {
                const image_path = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket_info_box"}>
                    <div className={"cancel_btn"}>
                      <CancelIcon
                        color={"primary"}
                        onClick={() => onDelete(item)}
                      />
                    </div>
                    <img src={image_path} className={"product_img"} />
                    <span className={"product_name"}>{item.name}</span>
                    <p className={"product_price"}>
                      ${item.price} * {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          className="remove"
                          onClick={() => onRemove(item)}
                        >
                          -
                        </button>
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems?.length > 0 ? (
            <Box className={"to_order_box"}>
              <span className={"price_text"}>
                Total: ${totalPrice} ({itemsPrice} + {shippingPrice})
              </span>
              <Button
                onClick={processOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
              >
                Place Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
