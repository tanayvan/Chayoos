import { Button, Container, Input, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Color from "../Config/Color";
import FormikForm from "./FormikForm";
import FormInput from "./FormInput";
import * as yup from "yup";
import FormSubmit from "./FormSubmit";
import { login } from "../Helper/apicalls";
import { Redirect } from "react-router";

export default function Signup() {
  const Schema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = (values) => {
    console.log(values);
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ flexGrow: 1, margin: "20px 0px" }}>
      <Container
        maxWidth="xs"
        style={{
          textAlign: "center",
          backgroundColor: "#F4F4F4",
          border: "1px solid #e8e8e8",
        }}
      >
        <p style={{ fontSize: 25 }}>Sign Up</p>
        {/* <br /> */}
        <p style={{ fontSize: 14 }}>Sign up with your Email</p>
        <FormikForm
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={Schema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* <FormInput
            feildName="name"
            placeholder="Name"
            variant="outlined"
            fullWidth
            label="Name"
            type="text"
          /> */}
          <FormInput
            feildName="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            label="Email"
          />
          <FormInput
            type="password"
            feildName="password"
            placeholder="Password"
            variant="outlined"
            fullWidth
            label="Password"
          />
          <FormSubmit>Sign Up</FormSubmit>
        </FormikForm>

        <br />
      </Container>
    </div>
  );
}
