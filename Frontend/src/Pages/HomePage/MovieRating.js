import Image from "react-bootstrap/Image";
import * as PropTypes from "prop-types";
import React from "react";

export function MovieRating({rating}) {
  return <div style={{height: "17px"}} className="d-flex">
    <Image src="https://www.iconsdb.com/icons/preview/yellow/star-8-xxl.png"
           rounded
           fluid
           style={{height: "17px"}}
           className="mr-2"
    />
    <span>{rating}</span>
  </div>;
}

MovieRating.propTypes = {rating: PropTypes.number};