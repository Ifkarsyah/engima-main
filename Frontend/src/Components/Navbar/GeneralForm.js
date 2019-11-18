import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, {useEffect} from "react";
import PropTypes from "prop-types";

export default function GeneralForm({children, title}) {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <Container fluid={true}>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h3 className="text-center mt-4 mb-5">
                <span>Welcome to </span>
                <span><strong>Engi</strong></span>
                <span>ma!</span>
              </h3>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

GeneralForm.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
