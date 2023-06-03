import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import { Button, Form } from "react-bootstrap";
import { authApi } from "../../api/authApi";
import "./loginpage.css";


export function LoginPage() {
  const navigator = useNavigate();

  // create state for formValues to watch changes
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    userType: "",
  });

  // create state for formErrors 
  const [error, setError] = useState({
    submit: false,
    email: false,
    password: false,
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
   
    let user = await authApi.getUser(
      formValues.email.toLowerCase(),
      formValues.userType,
    );

    if (!user || user.password !== formValues.password) {
      setError({
        ...error,
        submit: true,
        submitText: "Check Your Login Details !!!!",
      });
      return;
    }

    if (!user.active) {
      setError({
        ...error,
        submit: true,
        submitText: "Activate Your Account, Activation Email was Sent",
      });
      let sendActiveEmailRes = await authApi.activationEmailSend(user)
      return;
    }

    setError({ ...error, submit: false, submitText: "" });
    console.log("login done");
  };

  //validate the user input when leave the input field
  //set the errors
  const validation = (e) => {
    const regex = {
      email: /^[\w]+@([\w-]+\.)+[\w-]{3}$/g,
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


  // Register Button handle event, to navigate to register page
  const registerNavigte = () => {
    navigator("/register");
  };

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <h1 className="">EHCO</h1>
      <Form
        onSubmit={submitHandler}
        className="login-form bg-dark p-5 d-flex flex-column"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">

          {/* Email Field */}
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

        {/* User Type Radio Buttons */}
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


        {/* Login Button */}
        <Button
          variant="primary"
          type="submit"
          className="login-btn w-75 mx-auto"
        >
          Login
        </Button>
        {error.submit && (
          <p className="text-danger align-self-center py-2">
            {error.submitText}
          </p>
        )}

        {/* Register Button */}
        <div className="my-3 w-100">
          <p className="register-text text-center  w-100">
            First time !!! Join us now{" "}
            <span onClick={registerNavigte} className="lead">
              Register
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
}
