import React, { useEffect, useState } from "react"; // imports the React library, which is necessary to use React components and JSX.
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";

import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
import Car from "./screens/RestaurantPage/testCar";
import AuthenticationModal from "./components/auth";
// import { SettingsSharp } from "@mui/icons-material";
import { Member } from "../types/user";
import { serverApi } from "../lib/config";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import MemberApiService from "./apiServer/memberApiServer";
import "../app/apiServer/verify";
import { CartItem } from "../types/others";
import { Product } from "../types/product";

function App() {
  //** Initializations */
  // React functional component
  const [verifiedMemberData, setverifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  // const location = useLocation();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  useEffect(() => {
    console.log("==== useEffect: App ====");
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null; // convers to object
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`
        : "/auth/default_user.png";
      setverifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]); // rerenders if eithere changes in array

  /**  Handlers */
  const handleSignupOpen = () => setSignUpOpen(true);
  const handleSignupClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 500, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    console.log("product:", product);
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };

  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };

  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };

  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignupOpen={handleSignupOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          verifiedMemberData={verifiedMemberData}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          verifiedMemberData={verifiedMemberData}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          verifiedMemberData={verifiedMemberData}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage onAdd={onAdd} />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
            verifiedMemberData={verifiedMemberData}
          />
        </Route>
        <Route path="/member-page">
          <MemberPage verifiedMemberData={verifiedMemberData} />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
          {/* <Car /> */}
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignupOpen={handleSignupOpen}
        handleSignupClose={handleSignupClose}
      />
    </Router>
  );
}

export default App;

// Functional components are the simplest way to create presentational components that do not require state or lifecycle methods.
