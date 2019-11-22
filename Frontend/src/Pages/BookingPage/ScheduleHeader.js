import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import React from "react";

export function ScheduleHeader(props) {
  return <>
    <Row className="mb-5 mt-5" style={{opacity: (props.finishTransaction && 0.5)}}>
      <Col xs={1} className="d-flex flex-column justify-content-center">
        <Link to={"/movies/" + props.schedule["movie_id"]} style={{textDecoration: "none"}}>
          <span className="text-primary" style={{fontSize: "30px"}}>❮</span>
        </Link>
      </Col>
      <Col xs={11} className="d-flex flex-column justify-content-center">
        <h3 className="font-weight-bolder">{props.urlQueries["title"]}</h3>
        <p className="font-weight-bold text-secondary">{props.schedule["date"] + " - " + props.schedule["time"]}</p>
      </Col>
    </Row>
    <hr style={{border: "1px solid #d9d9d9"}}/>
  </>;
}

ScheduleHeader.propTypes = {
  schedule: PropTypes.shape({}),
  urlQueries: PropTypes.any
};