import React from "react";
import { useParams } from "react-router";

export default function ReviewPage() {
  const { transactionId } = useParams();
  return (
    <>
      <h1 className="text-center">MovieId {transactionId}</h1>
    </>
  );
}
