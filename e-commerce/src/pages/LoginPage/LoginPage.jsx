import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import { Button, Form } from "react-bootstrap";

import "./loginpage.css";

export function LoginPage() {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState({});
  const [userType, setUserType] = useState("");
  // authApi.getUser('khaled@gmail.com')
  const inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const userTypeHandler = (e) => {
    setUserType(e.target.id);
    console.log(e.target.id);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formValues);
    console.log("login done");
  };
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

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <Form
        onSubmit={submitHandler}
        className="login-form bg-dark p-5 d-flex flex-column"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="email"
            placeholder="Enter email"
            name="email"
          />

          {error.email && <p className="text-danger">Email not valid</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="password"
            placeholder="Password"
            name="password"
          />
          {error.password && (
            <ul className="text-danger">
              <li>passwort length at least 8</li>
              <li>at least one uppercase</li>
              <li>at least one lowercase</li>
              <li>at least one special character</li>
            </ul>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <label htmlFor="admin">
            <input
              type="radio"
              name="userType"
              id="admin"
              onClick={userTypeHandler}
            />{" "}
            Admin
          </label>
          <br></br>
          <label htmlFor="customer">
            <input
              type="radio"
              name="userType"
              id="customer"
              onClick={userTypeHandler}
            />{" "}
            Customer
          </label>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-75 m-auto"
          disabled={error.email || error.password}
        >
          Login
        </Button>
        {/* <p className='register-text'>Register</p> */}
      </Form>
    </div>
  );
}
