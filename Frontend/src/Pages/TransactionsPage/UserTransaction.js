import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import {TransactionStatus} from "./TransactionStatus";
import {AddComment} from "./AddComment";
import * as PropTypes from "prop-types";
import React from "react";

export function UserTransaction(props) {
  return <>
    <Row className="my-4">
      <Col xs={2}>
        <Image src={MovieDbAPI.baseUrlImage + props.transaction["poster_path"]} rounded fluid style={{width: "154px"}}/>
      </Col>
      <Col xs={6} className="d-flex flex-column justify-content-center">
        <h5 className="font-weight-bolder">{props.transaction["title"]}</h5>
        <p className="font-weight-bolder">
          <span className="text-primary">Movie Schedule: </span>
          {props.transaction["movie_schedule"]}
        </p>
        <p className="font-weight-bolder">
          <span className="text-primary">Transaction Time: </span>
          {props.transaction["created_on"]}
        </p>
        <TransactionStatus status={props.transaction["status"]}/>
      </Col>
      <Col xs={4} className="position-relative">
        <AddComment transactionStatus={props.transaction["status"]} existsComment={true}
                    transactionId={props.transaction["id"]}/>
      </Col>
    </Row>
    <hr style={{border: "1px solid #d9d9d9"}}/>
  </>;
}

UserTransaction.propTypes = {transaction: PropTypes.any};