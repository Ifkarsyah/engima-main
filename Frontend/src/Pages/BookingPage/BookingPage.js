import React from "react";
import { useParams } from "react-router";

export default function BookingPage() {
  const { scheduleId } = useParams();
  return (
    <>
      <h1 className="text-center">MovieId {scheduleId}</h1>
    </>
  );
}
