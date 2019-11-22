import React, {useEffect, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Engima} from "../../Utilities/Engima";
import queryString from "query-string";
import {Button} from "react-bootstrap";
import {ScheduleHeader} from "./ScheduleHeader";
import cookies from "../../Utilities/Cookies";
import $ from "jquery";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function BookingPage() {
  const {scheduleId} = useParams();
  const location = useLocation();
  const history = useHistory();
  const urlQueries = queryString.parse(location.search);
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [lastSelect, setLastSelect] = useState(-1);
  const [finishTransaction, setFinishTransaction] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [vaReceiver, setVaReceiver] = useState();

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
  }, [scheduleId]);


  const handleSubmit = async () => {
    let username = "";
    let userId = "";

    const pathUrl = '/user/logged';
    const params = `?token=${cookies.get('token')}`;
    const totalUrl = Engima.baseUrl + pathUrl + params;
    const responseEngima = await fetch(totalUrl);
    const bodyEngima = await responseEngima.json();
    username = bodyEngima.username;
    userId = bodyEngima.userId;
    console.log('username ',username);
    console.log('userid ',userId);


    const url = 'http://localhost:8080/ws-bank/Bank?WSDL';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
        '    <soap:Body>\n' +
        '        <ns0:createVirtualAccount xmlns:ns0="http://wsbank.org/">\n' +
        `            <username>${username}</username>\n` +
        '        </ns0:createVirtualAccount>\n' +
        '    </soap:Body>\n' +
        '</soap:Envelope>\n'
    });
    const body = await response.text();
    const xmlResp = $($.parseXML(body));
    const vaReceiver = xmlResp.find("return").text();
    console.log('vaReceiver = ',vaReceiver);

    const responseNode = await fetch('http://localhost:5000/transaction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        userId: userId,
        movieId: urlQueries['movieId'],
        seat: selected,
        vaReceiver: vaReceiver,
        movieSchedule: scheduleId
      })
    });
    const bodyNode = await responseNode.json();
    const transactionId = bodyNode.transactionId;
    console.log(transactionId);
    setVaReceiver(vaReceiver);
    setTransactionId(transactionId);
    setFinishTransaction(true);
  };

  const handleGoToTransaction = () => {
    history.push("/transactions");
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

  const Payment = ({finishTransaction}) => {
    if (selected === -1) {
      return null;
    }
    return (
      <>
        <Col xs={4}><h6 className="font-weight-bold mb-4">Seat {selected}</h6></Col>
        <Col xs={8} className="text-right">
          <h6 className="font-weight-bold mb-4" style={{opacity: (finishTransaction && 0.5)}}>Rp 45.000</h6>
          <Button className="text-white" onClick={handleSubmit} disabled={finishTransaction}>Buy Ticket</Button>
        </Col>
      </>
    );
  };

  return (
    <Container fluid={true} className="mt-5" style={{marginTop: "-100px", borderWidth: "20px"}}>
      <ScheduleHeader schedule={schedule} urlQueries={urlQueries} finishTransaction={finishTransaction} />
      <Row className={finishTransaction && "justify-content-center"}>
        <PopupModal transactionId={transactionId} vaReceiver={vaReceiver} finishTransaction={finishTransaction} handleGoToTransaction={handleGoToTransaction}/>
        <Col xs={7} className="d-flex flex-wrap">
          <SeatList seatInformation={seats} handleClick={handleClick} finishTransaction={finishTransaction}/>
          <Button variant="secondary" block disabled>Screen</Button>
        </Col>
        <Col xs={5}>
          <h4 className="font-weight-bold text-secondary mb-4">Booking Summary</h4>
          <h5 className="font-weight-bold">{urlQueries['title']}</h5>
          <p className="font-weight-light text-secondary">{schedule['date'] + ' - ' + schedule['time']}</p>
          <Row>
            <Payment finishTransaction={finishTransaction}/>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const PopupModal = ({transactionId, vaReceiver, finishTransaction, handleGoToTransaction}) => {
  console.log(finishTransaction);
  if (!finishTransaction) {
    return null;
  }
  const handleClick = () => handleGoToTransaction();

  return (
    <Card className="position-absolute" style={{backgroundColor: "white", zIndex:1, marginTop: "-120px", border: "solid 10px"}}>
      <Card.Body>
        <h1 className={"font-weight-bold text-warning text-center"} style={{fontSize: "40px"}}>Order Success!</h1>
        <Card.Text>
          Please, transfer to this virtual account from your bank account within 2 minutes!
        </Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item className="font-weight-bold">{"Transaction id: " + transactionId}</ListGroup.Item>
          <ListGroup.Item className="font-weight-bold">{"Virtual account: " + vaReceiver}</ListGroup.Item>
          <h5 className="font-weight-bold text-danger mt-5">
            If you don't pay within 2 minutes, your transaction will be cancelled!
          </h5>
        </ListGroup>
        <Button variant="primary" onClick={handleClick} block>Go to Transaction History</Button>
      </Card.Body>
    </Card>
  );
}

const Seat = (props) => {
  const style = {height: '50px', width: '50px'};
  const {handleClick, num, status, finishTransaction} = props;
  const reserved = <Button style={style} className="m-1" onClick={handleClick} variant="secondary"
                           disabled>{num}</Button>;
  const normal = <Button style={style} className="m-1" onClick={handleClick} variant="outline-primary" disabled={finishTransaction}>{num}</Button>;
  const selected = <Button style={style} className="m-1" onClick={handleClick} disabled={finishTransaction}>{num}</Button>;
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

const SeatList = ({seatInformation, handleClick, finishTransaction}) => {
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

  const rendered = seatNow.map((status, idx) => <Seat key={idx + 1} status={status} num={idx + 1} finishTransaction={finishTransaction} handleClick={() => {
    handleClick(idx + 1);
    handleChange(idx + 1);
  }}/>)
  return (
    <div>
      {rendered}
    </div>
  );
};