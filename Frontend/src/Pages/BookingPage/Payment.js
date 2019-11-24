import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import React from "react";

export const Payment = ({finishTransaction, selectedSeat, handleSubmit}) => {
  if (selectedSeat === -1) {
    return null;
  }
  return (
    <>
      <Col xs={4}><h6 className="font-weight-bold mb-4">Seat {selectedSeat}</h6></Col>
      <Col xs={8} className="text-right">
        <h6 className="font-weight-bold mb-4" style={{opacity: (finishTransaction && 0.5)}}>Rp 45.000</h6>
        <Button className="text-white" onClick={handleSubmit} disabled={finishTransaction}>Buy Ticket</Button>
      </Col>
    </>
  );
};