import React from "react";
import { useParams } from "react-router";

export default function MovieDetail() {
  const { movieId } = useParams();
  return (
    <>
      <h1 className="text-center">MovieId {movieId}</h1>
    </>
  );
}
