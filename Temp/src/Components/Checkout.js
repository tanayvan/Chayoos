import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Icon,
  Input,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Color from "../Config/Color";
import cartContext from "../context";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";

export default function Checkout() {
  const history = useHistory();
  const { cart, orderType } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const cartItems = cart;
  const [tabelBook, setTabelBook] = useState(false);
  const [tabelNo, setTabelNo] = useState(1);

  function sum() {
    var total = 0;
    cart.map((item) => {
      total = total + item.product.price * item.quantity;
    });
    return total;
  }

  useEffect(() => {
    setTotal(sum());
  }, [cart]);

  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      {cart.length > 0 && (
        <Container maxWidth="md" style={{ backgroundColor: "#F4F4F4" }}>
          <p className="textCenter" style={{ fontSize: 25 }}>
            Checkout
          </p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="cartBox">{`Total ${cartItems.length} Items`}</div>
              {cartItems.map((item, index) => (
                <OrderItem item={item} index={index} />
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
                {cart && <div style={{ color: "grey" }}>{`${total}`}</div>}
              </div>
              <div
                className="cartBox"
                style={{ margin: "10px 0px 0px 0px ", fontSize: 14 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: Color.green,

                        padding: "0px 10px",
                      }}
                      checked={tabelBook}
                      onChange={(event, value) => setTabelBook(value)}
                    />
                  }
                  label={<div style={{ fontSize: "normal" }}>BOOK TABEL</div>}
                />
              </div>
              {tabelBook && (
                <div className="cartBox" style={{ color: "grey" }}>
                  {tabelNo ? tabelNo : "NA"}
                </div>
              )}

              <div style={{ margin: "10px 0px 0px 0px ", display: "flex" }}>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <Button
                    style={{
                      backgroundColor: Color.green,
                      color: "white",
                      width: "90%",
                    }}
                    onClick={() => {
                      console.log(orderType);
                    }}
                  >
                    Pay at cafe
                  </Button>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <Button
                    style={{
                      backgroundColor: Color.green,
                      color: "white",
                      width: "90%",
                    }}
                    onClick={() => {
                      console.log(orderType);
                    }}
                  >
                    Pay Online
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
