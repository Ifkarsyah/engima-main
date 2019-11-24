import {Button} from "react-bootstrap";
import React from "react";

export const Seat = (props) => {
  const style = {height: '50px', width: '50px'};
  const {handleClick, num, status, finishTransaction} = props;
  const reserved = <Button style={style} className="m-1" onClick={handleClick} variant="secondary"
                           disabled>{num}</Button>;
  const normal = <Button style={style} className="m-1" onClick={handleClick} variant="outline-primary"
                         disabled={finishTransaction}>{num}</Button>;
  const selected = <Button style={style} className="m-1" onClick={handleClick}
                           disabled={finishTransaction}>{num}</Button>;
  switch (parseInt(status)) {
    case 0:
      return reserved;
    case 1:
      return normal;
    case 2:
      return selected;
    default:
      return null;
  }
};