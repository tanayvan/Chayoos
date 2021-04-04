import { Container } from "@material-ui/core";
import React from "react";
import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import * as yup from "yup";

export default function AddProduct() {
  const Schema = yup.object().shape({
    title: yup.string().required().min(3),
    subtitle: yup.string().required().min(3),
    price: yup.number().required(),
    stock: yup.number().required(),
    photo: yup.string().required(),
  });

  const handleSubmit = (values, resetForm) => {
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
          <FormikForm
            initialValues={{
              title: "",
              subtitle: "",
              price: "",
              photo: "",
              stock: "",
            }}
            validationSchema={Schema}
            onSubmit={(values, { resetForm }) => {
              values.stock = parseInt(values.stock);
              values.price = parseInt(values.price);
              handleSubmit(values, resetForm);
            }}
          >
            <FormInput
              feildName="title"
              placeholder="Title"
              variant="outlined"
              fullWidth
              label="Title"
            />
            <FormInput
              // type="password"
              feildName="subtitle"
              placeholder="Sub Title"
              variant="outlined"
              fullWidth
              label="SubTitle"
            />
            <FormInput
              type="number"
              feildName="price"
              placeholder="Price"
              variant="outlined"
              fullWidth
              label="Price"
            />
            <FormInput
              type="file"
              feildName="photo"
              // placeholder="Price"
              variant="outlined"
              fullWidth
              label="Photo"
            />
            <FormInput
              type="number"
              feildName="stock"
              placeholder="Stock"
              variant="outlined"
              fullWidth
              label="Stock"
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
