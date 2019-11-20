import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Engima} from "../../Utilities/Engima";
import queryString from "query-string";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import FormLabel from "react-bootstrap/FormLabel";

export default function BookingPage() {
  const {scheduleId} = useParams();
  const location = useLocation();
  const urlQueries = queryString.parse(location.search);
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeat] = useState(0);

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
    })();
  }, []);

  const handleSubmit = () => {
    alert(selectedSeats);
  };

  const handleSeatSelection = (num) => {
    setSelectedSeat(num);
  };

  return (
    <Container fluid={true} className="mt-5">
      <Row className="mb-5 mt-5">
        <Col xs={1} className="d-flex flex-column justify-content-center">
          <Link to={"/movies/" + schedule['movie_id']} style={{textDecoration: 'none'}}>
            <span className="text-primary" style={{fontSize: '30px'}}>❮</span>
          </Link>
        </Col>
        <Col xs={11} className="d-flex flex-column justify-content-center">
          <h3 className="font-weight-bolder">{urlQueries['title']}</h3>
          <p className="font-weight-bold text-secondary">{schedule['date'] + ' - ' + schedule['time']}</p>
        </Col>
      </Row>
      <hr style={{border: '1px solid #d9d9d9'}}/>

      <Row>
        <Col xs={7} className="d-flex flex-wrap">
          {seats.map((code, i) => <Seat num={i} code={code} handleSeatSelection={() => handleSeatSelection(i)}/>)}
          <Button variant="secondary" block disabled>Screen</Button>
        </Col>

        <Col xs={5}>
          <h4 className="font-weight-bold text-secondary mb-4">Booking Summary</h4>

          <h5 className="font-weight-bold">{urlQueries['title']}</h5>
          <p className="font-weight-light text-secondary">{schedule['date'] + ' - ' + schedule['time']}</p>
          <Row>
            <Col xs={4}>
              <h6 className="font-weight-bold mb-4">Seat #4</h6>
            </Col>
            <Col xs={8} className="text-right">
              <h6 className="font-weight-bold mb-4">Rp 45.000</h6>
              <Button className="text-white" onSubmit={handleSubmit}>Buy Ticket</Button>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  );
}

function Seat({num, code, handleSeatSelection}) {
  const style = {height: '50px', width: '50px', userSelect: 'none'};
  const reservedButton = <Button className="m-1 " variant="secondary" style={style} disabled>{num}</Button>;

  const selectedButton = <Button className="m-1 " variant="primary" style={style}
                                 onClick={handleSeatSelection}>{num}</Button>;

  const normalButton = <Button className="m-1 " variant="outline-primary" style={style}
                               onClick={handleSeatSelection}>{num}</Button>;


  switch (code) {
    case '0':
      return reservedButton;
    case '1':
      return normalButton;
    case '2':
      return selectedButton;
  }
}