import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import Table from "../Components/Table";
import tableGrey from "../Config/table.svg";
import tableGreen from "../Config/tableGreen.svg";
import cartContext from "../context";

export default function Tables() {
  const { orderType } = useContext(cartContext);

  const [reservedTables, setReservedTables] = useState([2, 4, 6, 8]);
  const [selected, setSelected] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const alterTable = () => {
    let temp = [...reservedTables];
    if (reservedTables.includes(selected)) {
      temp.splice(temp.indexOf(selected), 1);
      setReservedTables(temp);
    } else {
      temp.push(selected);
      setReservedTables(temp);
    }
    setShowDialog(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar2 />
      <div style={{ margin: "30px 0px" }}>
        <Container
          maxWidth="md"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <h3 style={{ fontWeight: "400" }} className="textCenter">
            Tables of branch {orderType.branch}
          </h3>
          <div
            style={{
              display: "flex",
              color: "grey",
              justifyContent: "center",
              alignItems: "center",
              marginBlock: 20,
            }}
          >
            <img src={tableGreen} style={{ width: 20, margin: 5 }} /> :
            Available
            <img
              src={tableGrey}
              style={{ width: 20, marginLeft: 20, marginRight: 5 }}
            />{" "}
            : Booked
          </div>
          <Grid container spacing={4}>
            {[...Array(10)].map((t, i) => (
              <Grid item xs={4} style={{ padding: "5%" }}>
                <Table
                  admin={true}
                  reserved={reservedTables.includes(i + 1)}
                  number={i + 1}
                  onClick={(index) => {
                    setSelected(index);
                    setShowDialog(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Dialog open={showDialog}>
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              you are{" "}
              {reservedTables.includes(selected)
                ? "making available"
                : "reserving"}{" "}
              table number {selected}.
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setShowDialog(false);
                }}
                color="primary"
              >
                NO
              </Button>
              <Button onClick={() => alterTable()} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
