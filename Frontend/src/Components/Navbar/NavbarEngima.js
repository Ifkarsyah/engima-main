import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Redirect } from "react-router";
import Authentication from "../../Utilities/Auth";

export default function NavbarEngima() {
  const logout = () => {
    Authentication.logout();
    return <Redirect to="/login" />;
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="home">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="transfer">Transfer</Nav.Link>
            <Nav.Link href="history">History</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="login" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="mb-5">empty</Navbar>
    </>
  );
}
