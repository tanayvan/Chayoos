import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context";
import { getAllProducts } from "../Helper/apicalls";
import AppCard from "./AppCard";
import CustomizeItemModal from "./CustomizeItemModal";

export default function Home() {
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setProducts(data);
    });
  }, []);
  return (
    <div style={{ margin: "30px 0px" }}>
      <Container maxWidth="lg">
        <Grid spacing={2} container>
          {products.length > 0 &&
            products.map((product, index) => (
              <Grid
                style={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={index.toString()}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <AppCard
                  onAddPress={() => {
                    setSelected(index);
                    setCartModalVisible(true);
                  }}
                  title={product.name}
                  subtitle={product.description}
                  photo={product.photo}
                  price={product.price}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
      {products.length > 0 && (
        <CustomizeItemModal
          title={products[selected].title}
          subtitle={products[selected].subtitle}
          price={products[selected].price}
          visible={cartModalVisible}
          closeModal={() => setCartModalVisible(false)}
          product={products[selected]}
        />
      )}
    </div>
  );
}
