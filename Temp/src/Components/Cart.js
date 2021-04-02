import { Button, Container, Grid, Icon, Input, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import Color from "../Config/Color";
import cartContext from "../context";
import CartItem from "./CartItem";

export default function Cart() {
  const history = useHistory();
  const { cart, setCart } = useContext(cartContext);
  const cartItems = cart;

  function sum() {
    var total = 0;
    cartItems.map((cart) => {
      total = total + cart.product.price;
    });
    return total;
  }
  // const cartItems = [
  //   {
  //     title: "coffe",
  //     photo:
  //       "https://images.all-free-download.com/images/graphicthumb/coffee_time_513817.jpg",
  //     specification: ["Regular"],
  //     price: 100,
  //     quantity: 3,
  //   },
  //   {
  //     title: "Tea",
  //     photo:
  //       "https://lh3.googleusercontent.com/0s--EXi3zgXNGif_mlOu_qMXCDXVi63HNx1YO0tjVqsGv_nGo3uAm3K7NRaP4iJ8nMHJfMGi2rRanL-a_e-NtXWyDrs=w640-h400-e365-rj-sc0x00ffffff",
  //     specification: ["Regular", "Extra sugar"],
  //     price: 50,
  //     quantity: 2,
  //   },
  //   {
  //     title: "Masala Tea",
  //     photo: "https://cdn.wallpapersafari.com/46/69/Wb9n1Y.jpg",
  //     specification: ["Full", "Extra milk", "Less Sugar"],
  //     price: 70,
  //     quantity: 4,
  //   },
  // ];

  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      {false && (
        <Container
          maxWidth="sm"
          style={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "10px 0px",
          }}
        >
          <p style={{ fontSize: 25 }}>My Cart</p>
          <img
            src="https://www.sngcrafts.com/uploads/emptycart.png"
            style={{ color: "red", opacity: 0.3, height: 100 }}
          />
          <p style={{ fontSize: 20 }}>
            Your cart is empty. <br />
            <span style={{ fontSize: 16, color: "grey" }}>
              Try some delicious food from our menu
            </span>
          </p>
          <Button
            style={{ backgroundColor: Color.green, color: "white" }}
            onClick={() => history.push("/")}
          >
            Go To Menu
          </Button>
        </Container>
      )}
      <Container maxWidth="md" style={{ backgroundColor: "#F4F4F4" }}>
        <p className="textCenter" style={{ fontSize: 25 }}>
          My Cart
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <div className="cartBox">{`Total ${cartItems.length} Items`}</div>

            {/* <div
                style={{
                  // flexDirection: "row",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <div>hsf</div>
               
              </div> */}
            {cartItems.map((item, index) => (
              <CartItem item={item} index={index} />
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="cartBox" style={{ fontSize: 14 }}>
              INSTRUCTIONS
            </div>
            <div className="cartBox">
              <input
                placeholder="Add Instructions"
                style={{ border: "none", outline: "none" }}
              />
            </div>
            <div
              className="cartBox"
              style={{ margin: "10px 0px 0px 0px ", fontSize: 14 }}
            >
              {`PRICE DETAIL`}
            </div>
            <div className="cartBox">
              <div style={{ color: "grey" }}>{`₹ ${sum()}`}</div>
            </div>
            <div style={{ margin: "10px 0px 0px 0px " }}>
              <Button
                style={{
                  backgroundColor: Color.green,
                  color: "white",
                  width: "100%",
                }}
              >
                Place Order
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
