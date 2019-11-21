import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Engima} from "../../Utilities/Engima";
import queryString from "query-string";
import {Button} from "react-bootstrap";
import {ScheduleHeader} from "./ScheduleHeader";
import {func} from "prop-types";

export default function BookingPage() {
  const {scheduleId} = useParams();
  const location = useLocation();
  const urlQueries = queryString.parse(location.search);
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [lastSelect, setLastSelect] = useState(-1);

  useEffect(() => {
    (async () => {
      const pathUrl = '/schedules/' + scheduleId;
      const totalUrl = Engima.baseUrl + pathUrl;
      const response = await fetch(totalUrl);
      const body = await response.json();

      const d = new Date(body['date_time']);
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      body['date'] = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
      body['time'] = d.toLocaleString([], {hour: 'numeric', minute: 'numeric', hour12: true});

      const seatInteger = parseInt(body['seats']);
      body['seats'] = seatInteger.toString(2);

      setSeats(Array.from(body['seats']));
      setSchedule(body);
      setLoaded(true);
    })();
  }, []);

  const handleSubmit = async () => {
    const url = 'http://aspire-e5-475g:8080/CalculatorWSApplication/CalculatorWS?wsdl';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\n' +
        '    <SOAP-ENV:Header/>\n' +
        '    <S:Body>\n' +
        '        <ns2:hello xmlns:ns2="http://calculator.me.org/">\n' +
        '            <name>name</name>\n' +
        '        </ns2:hello>\n' +
        '    </S:Body>\n' +
        '</S:Envelope>'
    });
    const body = await response.text();
    console.log(body);
  };

  const handleClick = (num) => {
    setSelected(num);
    const newSeats = [...seats];
    newSeats[num] = '2';
    newSeats[lastSelect] = '1';
    setSeats(newSeats);
    setLastSelect(num);
  };

  if (!loaded) {
    return <p>Loading....</p>
  }

  const Payment = () => {
    if (selected === -1) {
      return null;
    }
    return (
      <>
        <Col xs={4}><h6 className="font-weight-bold mb-4">Seat {selected}</h6></Col>
        <Col xs={8} className="text-right">
          <h6 className="font-weight-bold mb-4">Rp 45.000</h6>
          <Button className="text-white" onClick={handleSubmit}>Buy Ticket</Button>
        </Col>
      </>
    );
  };

  return (
    <Container fluid={true} className="mt-5">
      <ScheduleHeader schedule={schedule} urlQueries={urlQueries}/>
      <Row>
        <Col xs={7} className="d-flex flex-wrap">
          <SeatList seatInformation={seats} handleClick={handleClick}/>
          <Button variant="secondary" block disabled>Screen</Button>
        </Col>
        <Col xs={5}>
          <h4 className="font-weight-bold text-secondary mb-4">Booking Summary</h4>
          <h5 className="font-weight-bold">{urlQueries['title']}</h5>
          <p className="font-weight-light text-secondary">{schedule['date'] + ' - ' + schedule['time']}</p>
          <Row>
            <Payment/>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const Seat = (props) => {
  const style = {height: '50px', width: '50px'};
  const {handleClick, num, status} = props;
  const reserved = <Button style={style} className="m-1" onClick={handleClick} variant="secondary"
                           disabled>{num}</Button>;
  const normal = <Button style={style} className="m-1" onClick={handleClick} variant="outline-primary">{num}</Button>;
  const selected = <Button style={style} className="m-1" onClick={handleClick}>{num}</Button>;
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

const SeatList = ({seatInformation, handleClick}) => {
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

  const rendered = seatNow.map((status, idx) => <Seat key={idx + 1} status={status} num={idx + 1} handleClick={() => {
    handleClick(idx + 1);
    handleChange(idx + 1);
  }}/>)
  return (
    <div>
      {rendered}
    </div>
  );
};