import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import * as yup from "yup";
import ErrorText from "../Components/ErrorText";

export default function AddBranch() {
  const Schema = yup.object().shape({
    branch: yup.string().required().min(3),
    tables: yup.number().required(),
  });

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (values, resetForm) => {
    if (!city) {
      setError("Select city in which branch is located");
      return;
    }
    values.city = city;
    console.log(values);
    resetForm();
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: "100%",
        // backgroundSize: ,
      }}
    >
      <Navbar2 />
      <div style={{ flexGrow: 1, margin: "20px 0px" }}>
        <Container
          maxWidth="xs"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <p style={{ fontSize: 25 }}>Add Product</p>
          {/* <br /> */}
          {/* <p style={{ fontSize: 14 }}>Login with your mobile no.</p> */}
          <ErrorText visible={error} error={error} />
          <FormControl
            variant="outlined"
            style={{ marginBlock: 10, width: "100%", textAlign: "left" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
            <Select
              value={city}
              onChange={(event) => {
                setError("");
                setCity(event.target.value);
              }}
              label="City"
              placeholder="City"
            >
              {["one", "two", "three"].map((text, index) => (
                <MenuItem key={index.toString()} value={text}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormikForm
            initialValues={{
              branch: "",
              tables: "",
            }}
            validationSchema={Schema}
            onSubmit={(values, { resetForm }) => {
              values.tables = parseInt(values.tables);

              handleSubmit(values, resetForm);
            }}
          >
            <FormInput
              feildName="branch"
              placeholder="Branch"
              variant="outlined"
              fullWidth
              label="Branch"
            />

            <FormInput
              type="number"
              feildName="tables"
              placeholder="Number of tables"
              variant="outlined"
              fullWidth
              label="Number of tables"
            />

            <FormSubmit>Submit</FormSubmit>
          </FormikForm>

          <br />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
