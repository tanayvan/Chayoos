import React, { useContext, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemText from "@material-ui/core/ListItemText";

import Icon from "@material-ui/core/Icon";
import {
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import cartContext from "../context";

export default function Navbar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [placeButton, setPlaceButton] = useState("New Delhi");
  const [selectValue, setSelectValue] = useState("");
  const [showTopDrawer, setShowTopDrawer] = useState(false);
  const history = useHistory();
  const { cart } = useContext(cartContext);
  const list = () => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={() => setShowSideBar(false)}
      onKeyDown={() => setShowSideBar(false)}
    >
      <List>
        <ListItem button key={"Home"}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button key={"Profile"}>
          <ListItemIcon>
            <Icon>person</Icon>
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem button key={"Cart"}>
          <ListItemIcon>
            <Icon>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText primary={"Cart"} />
        </ListItem>
        <ListItem button key={"MyOrder"} onClick={() => console.log("hello")}>
          <ListItemIcon>
            <Icon>assignment_turned_in</Icon>
          </ListItemIcon>
          <ListItemText primary={"My Orders"} />
        </ListItem>
        <ListItem button key={"Login"} onClick={() => history.push("/login")}>
          <ListItemIcon>
            <Icon>login</Icon>
          </ListItemIcon>
          <ListItemText primary={"Login"} />
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const top = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        paddingBottom: 100,
      }}
    >
      <p>Select your choice to start placing order</p>

      <RadioGroup
        aria-label="gender"
        name="gender1"
        // value={value}
        // onChange={handleChange}
        count={1}
        row
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="Take Away"
        />
        <FormControlLabel value="male" control={<Radio />} label="Dine In" />
        <FormControlLabel value="other" control={<Radio />} label="Delivery" />
      </RadioGroup>
      <Container
        maxWidth="lg"
        style={{
          textAlign: "center",
          marginBlock: 10,
        }}
      >
        <ToggleButtonGroup
          style={{ display: "block" }}
          value={placeButton}
          exclusive
          onChange={(event, value) => setPlaceButton(value)}
          aria-label="text alignment"
        >
          {[
            "New Delhi",
            "Gurgaon",
            "Ghaziabad",
            "Chnadigarh",
            "Noida",
            "Karnal",
            "Faridabad",
            "Mumbai",
            "Banglore",
          ].map((text, index) => (
            <ToggleButton
              key={text}
              value={text}
              aria-label="left aligned"
              style={{
                textTransform: "capitalize",
                padding: "5px 20px",
                borderRadius: 20,
                margin: 5,
                border: "none",
                // margin: 20,
              }}
            >
              {text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Container>

      <Container maxWidth="xs">
        <FormControl
          variant="outlined"
          style={{ marginBlock: 10, width: "100%" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
          <Select
            // style={{ fontSize: 14 }}
            // native
            // fullWidth
            value={selectValue}
            onChange={(event) => setSelectValue(event.target.value)}
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            {["one", "two", "three"].map((text, index) => (
              <MenuItem key={index.toString()} value={text}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <IconButton
        style={{ position: "absolute", right: 10, top: 10 }}
        edge="start"
        // className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={() => setShowTopDrawer(false)}
      >
        <Icon>close</Icon>
      </IconButton>
    </div>
  );

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#5E7E47" }}>
          <Toolbar>
            <Box mr={3}>
              <IconButton
                style={{ marginInline: 5 }}
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSideBar(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Chayoos
              <Button onClick={() => setShowTopDrawer(true)}>hello</Button>
            </Typography>
            {/* <Link to="/cart" style={{ color: "white" }}> */}
            <IconButton
              style={{ marginInline: 5 }}
              edge="start"
              // className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <Icon>shopping_cart</Icon>
              </Badge>
            </IconButton>
            {/* </Link> */}
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <React.Fragment key={"left"}>
          {/* <Button onClick={() => setShowSideBar(true)}>Left</Button> */}
          <Drawer
            anchor={"left"}
            open={showSideBar}
            onClose={() => setShowSideBar(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
        <React.Fragment key={"top"}>
          <Drawer
            anchor="top"
            open={showTopDrawer}
            onClose={() => setShowTopDrawer(false)}
          >
            {top()}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}
