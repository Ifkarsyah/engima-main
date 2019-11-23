import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";
import React from "react";

export const PopupModal = ({transactionId, vaReceiver, finishTransaction, handleGoToTransaction}) => {
  if (!finishTransaction) {
    return null;
  }
  const handleClick = () => handleGoToTransaction();

  return (
    <Card className="position-absolute"
          style={{backgroundColor: "white", zIndex: 1, marginTop: "-120px", border: "solid 10px"}}>
      <Card.Body>
        <h1 className={"font-weight-bold text-warning text-center"} style={{fontSize: "40px"}}>Order Success!</h1>
        <Card.Text>
          Please, transfer to this virtual account from your bank account within 2 minutes!
        </Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item className="font-weight-bold">{"Transaction id: " + transactionId}</ListGroup.Item>
          <ListGroup.Item className="font-weight-bold">{"Virtual account: " + vaReceiver}</ListGroup.Item>
          <h5 className="font-weight-bold text-danger mt-5">
            If you don't pay within 2 minutes, your transaction will be cancelled!
          </h5>
        </ListGroup>
        <Button variant="primary" onClick={handleClick} block>Go to Transaction History</Button>
      </Card.Body>
    </Card>
  );
}