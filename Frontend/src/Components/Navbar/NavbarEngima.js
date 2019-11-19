import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Redirect } from "react-router";
import Authentication from "../../Utilities/Auth";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default function NavbarEngima() {
  const logout = () => {
    Authentication.logout();
    return <Redirect to="/login" />;
  };
  return (
    <>
      <Navbar bg="white" fixed="top">
        <Container className="px-5">
          <Navbar.Brand href="home">
            <strong>
              <span className="text-primary">Engi</span>
              <span>ma</span>
            </strong>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Form inline>
                <FormControl type="text" placeholder="Search" />
            </Form>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="transactions">Transaction</Nav.Link>
            <Nav.Link href="login" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
