import { Container, Grid } from "@material-ui/core";
import React from "react";
import Order from "./Order";
import OrderItem from "./OrderItem";

export default function MyOrders() {
  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      <Container maxWidth="md" style={{ backgroundColor: "#F8F8F8" }}>
        <p className="textCenter" style={{ fontSize: 25 }}>
          My Orders
        </p>
        <Order />
        <Order />
      </Container>
    </div>
  );
}
