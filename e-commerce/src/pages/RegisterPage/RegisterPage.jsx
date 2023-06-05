import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import { Button, Form } from "react-bootstrap";
import { authApi } from "../../api/authApi";
import "./register.css";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

export function RegisterPage() {
  const navigator = useNavigate();

  //set the formValues state
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  //set the error and validations state
  const [error, setError] = useState({
    submit: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // handle the input fields and change the fromValues according to current input
  const inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  //handle the form submit, then login if valid
  const submitHandler = async (e) => {
    e.preventDefault();
    setError({ ...error, submit: false, submitText: "" });

    const user = {
      id: uuidv4(),
      userName: formValues.email.split("@")[0],
      email: formValues.email,
      password: formValues.password,
      active: false,
      wishList: [],
      cart: [],
      type: formValues.userType,
    };

    if (error.password || error.confirmPassword || error.email) {
      setError({
        ...error,
        submit: true,
        submitText: "Some Data Aren't Valid",
      });
      return;
    }

    try {
      let checkEmailExists = await authApi.getUser(user.email, user.type);
      
      if (checkEmailExists) {
        setError({
          ...error,
          submit: true,
          submitText: "This Email Does Exists",
        });
        return;
      }

      let res = await authApi.addUser(user, user.type);

      let activateRes = await authApi.activationEmailSend(user);
      navigator("/login");

    } catch (e) {
      console.log(e);
    }
  };

  //validate the user input when leave the input field
  //set the errors
  const validation = (e) => {
    const regex = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[\w]{2,3}$/g,
      password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };
    const name = e.target.name;
    const value = formValues[name];
    const check = regex[e.target.name].test(value);
    setError({
      ...error,
      [e.target.name]: false,
    });

    if (!check) {
      setError({
        ...error,
        [e.target.name]: true,
      });
    }
  };
  

  // Check Password again and confirm that both passwords do match
  const passwordMatchHandler = (e) => {
    setError({
      ...error,
      confirmPassword: false,
    });

    if (e.target.value != formValues.password) {
      setError({
        ...error,
        confirmPassword: true,
      });
    }
  };


  return (
    <div className="register d-flex flex-column justify-content-center align-items-center">
      {/* <h1 className="">Register to EHCO</h1> */}
      <Form
        onSubmit={submitHandler}
        className="register-form bg-dark p-5 d-flex flex-column"
      >
        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="email"
            placeholder="Enter email"
            name="email"
            required
          />

          {error.email && (
            <p className="text-danger mx-2 my-2">Not a valid email</p>
          )}
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          {error.password && (
            <ul className="password-list text-danger m-0 p-2">
              <li>passwort length at least 8</li>
              <li>at least one uppercase</li>
              <li>at least one lowercase</li>
              <li>at least one special character</li>
            </ul>
          )}
        </Form.Group>

        {/* confirmPassword Field */}
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={passwordMatchHandler}
            type="password"
            placeholder="Password"
            name="confirmPassword"
            required
          />
          {error.confirmPassword && (
            <p className="text-danger mx-2 my-2">Password Dosesn't match !!!</p>
          )}
        </Form.Group>

        {/* userType Field */}
        <Form.Group
          className="mb-3 d-flex justify-content-around"
          controlId="formBasicCheckbox"
        >
          <label htmlFor="admin">
            <input
              type="radio"
              name="userType"
              id="admin"
              value="admin"
              onClick={inputHandler}
              required
            />{" "}
            Admin
          </label>
          <br></br>
          <label htmlFor="customer">
            <input
              type="radio"
              name="userType"
              id="customer"
              value="customer"
              onClick={inputHandler}
              required
            />{" "}
            Customer
          </label>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="register-btn w-75 mx-auto"
        >
          Register
        </Button>
        {error.submit && (
          <p className="text-danger align-self-center py-2">
            {error.submitText}
          </p>
        )}
      </Form>
    </div>
  );
}
