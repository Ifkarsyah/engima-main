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
import {SeatList} from "./SeatList";
import {PopupModal} from "./PopupModal";
import {Payment} from "./Payment";
import {soapCall} from "../../Utilities/WS_Bank";
import {WS_Transaksi} from "../../Utilities/WS_Transaksi";
import {extractDateTime} from "../../Utilities/Datetime";

export default function BookingPage() {
  const {scheduleId} = useParams();
  const location = useLocation();
  const history = useHistory();
  const urlQueries = queryString.parse(location.search);
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedSeat, setSelected] = useState(-1);
  const [lastSelect, setLastSelect] = useState(-1);
  const [finishTransaction, setFinishTransaction] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [vaReceiver, setVaReceiver] = useState();

  useEffect(() => {
    (async () => {
      const totalUrl = Engima.baseUrl + '/schedules/' + scheduleId;
      const response = await fetch(totalUrl);
      const body = await response.json();

      const [date, time] = extractDateTime(body['date_time']);
      body['date'] = date;
      body['time'] = time;
      body['seats'] = parseInt(body['seats']).toString(2);

      setSeats(Array.from(body['seats']));
      setSchedule(body);
      setLoaded(true);
    })();
  }, [scheduleId]);


  const handleSubmit = async () => {
    let username, userId;
    const totalUrl = Engima.baseUrl + `/user/logged?token=${cookies.get('token')}`;
    const responseEngima = await fetch(totalUrl);
    const bodyEngima = await responseEngima.json();
    username = bodyEngima.username;
    userId = bodyEngima.userId;


    const xmlResp = await soapCall(
      '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
      '    <soap:Body>\n' +
      '        <ns0:createVirtualAccount xmlns:ns0="http://wsbank.org/">\n' +
      `            <username>${username}</username>\n` +
      '        </ns0:createVirtualAccount>\n' +
      '    </soap:Body>\n' +
      '</soap:Envelope>\n'
    );
    const vaReceiver = xmlResp.find("return").text();

    const responseWS_Transaksi = await fetch(WS_Transaksi.baseUrl + '/transaction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        userId: userId,
        scheduleId: scheduleId,
        movieId: urlQueries['movieId'],
        seat: selectedSeat,
        vaReceiver: vaReceiver,
        movieSchedule: schedule["date"] + " - " + schedule["time"]
      })
    });
    const bodyWS_transaksi = await responseWS_Transaksi.json();
    const transactionId = bodyWS_transaksi.transactionId;


    const respEngima = await fetch(Engima.baseUrl + '/schedules/' + scheduleId + '/seat', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'action': 'reserve',
        'seat': selectedSeat,
      })
    });
    const bodyEngimaSeat = await respEngima.json();

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
            <Payment finishTransaction={finishTransaction} handleSubmit={handleSubmit} selectedSeat={selectedSeat}/>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

