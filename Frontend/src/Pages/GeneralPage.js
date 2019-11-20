import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import NavbarEngima from "../Components/Navbar/NavbarEngima";

export default function GeneralPage({children, title}) {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>
      <NavbarEngima/>
      <Container fluid={true} className="min-vw-100 mt-5">
        <Row className="justify-content-center">
          <Col xs={1} className="bg-dark min-vh-100"></Col>
          <Col xs={10} className="pt-3">
            {children}
          </Col>
          <Col xs={1} className="bg-dark  min-vh-100"></Col>
        </Row>
      </Container>
    </>
  );
}

GeneralPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
