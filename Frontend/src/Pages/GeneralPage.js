import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function GeneralPage({ children, title }) {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-5">
                <strong>{title}</strong>
              </h3>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

GeneralPage.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
