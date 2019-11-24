import Button from "react-bootstrap/Button";
import React from "react";

export const AddComment = ({transactionStatus, existComment, transactionId}) => {
  if (transactionStatus !== 'SUCCESS') {
    return null;
  }
  if (existComment) {
    return (
      <>
        <Button variant="danger" href={"/schedules/" + transactionId}
                style={{position: 'absolute', bottom: 0, right: 0}}>Delete Review</Button>
        <Button variant="success" href={"/schedules/" + transactionId}
                style={{position: 'absolute', bottom: 50, right: 0}}>Edit Review</Button>
      </>
    )
  }
  return (
    <Button variant="primary" href={"/schedules/" + transactionId} style={{position: 'absolute', bottom: 0, right: 0}}>Add
      Review</Button>
  )
}