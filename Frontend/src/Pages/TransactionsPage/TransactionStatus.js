import Button from "react-bootstrap/Button";
import React from "react";

export const TransactionStatus = ({status}) => {
  if (status === "PENDING") {
    return <Button variant="light">PENDING</Button>
  }
  if (status === "CANCELLED") {
    return <Button variant="danger">CANCELLED</Button>
  }
  if (status === "SUCCESS") {
    return <Button variant="success">SUCCESS</Button>
  }
}