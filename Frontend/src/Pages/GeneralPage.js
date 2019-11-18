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
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col xs={10}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

GeneralPage.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
