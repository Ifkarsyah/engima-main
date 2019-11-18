import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import Authentication from "../../Utilities/Auth";

function LoginForm() {
  const [accountNumber, setAccountNumber] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setIsAuthenticated(Authentication.login(accountNumber));
  };

  const handleChange = e => {
    setAccountNumber(e.target.value);
    setErrors(Number.isNaN(e.target.value) ? "Input must be a number!" : "");
  };

  const TheLoginForm = (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label column>Account Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={handleChange}
        />
        <Form.Text className="text-danger">
          {errors.length > 0 ? errors : <span>&nbsp;&nbsp;</span>}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" block disabled={errors !== ""}>
        Login
      </Button>
    </Form>
  );

  return isAuthenticated ? <Redirect to="/home" /> : TheLoginForm;
}

export default function LoginPage() {
  return <LoginForm />;
}
