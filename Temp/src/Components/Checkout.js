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
import StripeCheckout from "react-stripe-checkout";
import { useHistory, Redirect } from "react-router";
import Color from "../Config/Color";
import cartContext from "../context";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import { createOrder, API } from "../Helper/apicalls";
export default function Checkout() {
  const history = useHistory();
  const { cart, orderType, user, setCart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tabelBook, setTabelBook] = useState(false);
  const [tabelNo, setTabelNo] = useState(1);

  function sum() {
    var total = 0;
    cart.map((item) => {
      total = total + item.product.price * item.quantity;
    });
    return total;
  }
  const makePayment = (token) => {
    const body = {
      token: token,
      product: cart,
      amount: sum(),
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    return fetch(`${API}/order/payment/${user.id}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log(status);
        if (status == 200) {
          handleCafePayment("Pay with Card");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCafePayment = (payment) => {
    let productList = [];
    cart.map((cart) => {
      productList.push({
        product: cart.product._id,
        quantity: cart.quantity,
        size: cart.size,
        sugar: cart.sugar,
        milk: cart.milk,
      });
    });
    const body = {
      products: productList,
      amount: sum(),
      type: orderType.type,
      branch: orderType.branch,
      user: user.id,
      payment: payment,
    };

    createOrder(user.id, user.token, body)
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("cart", JSON.stringify([]));
          setCart([]);
          setIsSuccess(true);
          return;
        }
        console.log(data.error);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setTotal(sum());
  }, [cart]);

  if (isSuccess) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      {cart.length > 0 && (
        <Container maxWidth="md" style={{ backgroundColor: "#F4F4F4" }}>
          <p className="textCenter" style={{ fontSize: 25 }}>
            Checkout
          </p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="cartBox">{`Total ${cart.length} Items`}</div>
              {cart.map((item, index) => (
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
                      handleCafePayment("Pay on Visit");
                    }}
                  >
                    Pay at cafe
                  </Button>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <StripeCheckout
                    stripeKey={process.env.REACT_APP_KEY}
                    token={makePayment}
                    amount={sum() * 100}
                  >
                    <Button
                      style={{
                        backgroundColor: Color.green,
                        color: "white",
                        width: "90%",
                      }}
                    >
                      Pay with Card
                    </Button>
                  </StripeCheckout>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
