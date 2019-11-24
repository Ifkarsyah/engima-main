import React, {useState} from "react";
import {Seat} from "./Seat";

export const SeatList = ({seatInformation, handleClick, finishTransaction}) => {
  const [seatNow, setSeatNow] = useState(seatInformation);
  const [selected, setSelected] = useState(-1);
  const [lastSelect, setLastSelect] = useState(-1);

  const handleChange = (idx) => {
    setSeatNow(prevSeats => {
      const newSeats = [...seatNow];
      newSeats[lastSelect - 1] = '1';
      newSeats[idx - 1] = '2';
      return newSeats;
    });
    setSelected(idx);
    setLastSelect(selected);
  };

  const rendered = seatNow.map((status, idx) => <Seat key={idx + 1} status={status} num={idx + 1}
                                                      finishTransaction={finishTransaction} handleClick={() => {
    handleClick(idx + 1);
    handleChange(idx + 1);
  }}/>)
  return (
    <div>
      {rendered}
    </div>
  );
};