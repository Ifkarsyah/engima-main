import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {Redirect, useHistory} from "react-router";
import Authentication from "../../Utilities/Auth";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import useForm from "react-hook-form";

export default function NavbarEngima() {
  let history = useHistory();
  const logout = () => {
    Authentication.logout();
    return <Redirect to="/login"/>;
  };
  const {register, handleSubmit} = useForm({mode: "onSubmit"});
  const onSubmit = async jsonBody => {
    history.push("/search?keyword=" + jsonBody['search']);
  };
  return (
    <>
      <Navbar bg="white" fixed="top">
        <Container className="px-5">
          <Navbar.Brand href="/home">
            <strong>
              <span className="text-primary">Engi</span>
              <span>ma</span>
            </strong>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Form inline onSubmit={handleSubmit(onSubmit)}>
              <FormControl name="search" type="text" placeholder="Search" ref={register}/>
            </Form>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/transactions" className="text-dark font-weight-bold">Transaction</Nav.Link>
            <Nav.Link href="/login" onClick={logout} className="text-dark font-weight-bold">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
