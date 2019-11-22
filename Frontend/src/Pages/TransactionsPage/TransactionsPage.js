import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import cookies from "../../Utilities/Cookies";
import {Engima} from "../../Utilities/Engima";
import Button from "react-bootstrap/Button";
import $ from "jquery";

export default function TransactionsPage() {
  const [transactionList, setTransactionList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      let userId = "";

      const pathUrl = '/user/logged';
      const params = `?token=${cookies.get('token')}`;
      const totalUrl = Engima.baseUrl + pathUrl + params;
      const responseEngima = await fetch(totalUrl);
      const bodyEngima = await responseEngima.json();
      userId = bodyEngima.userId;

      const responseNode = await fetch('http://localhost:5000/transaction/' + userId);
      const bodyNode = await responseNode.json();
      console.log(bodyNode);

      for (let i = 0; i < bodyNode.length; i++){
        const pathUrl = '/movie/' + bodyNode[i]['movie_id'];
        let params = `?api_key=${MovieDbAPI.apiKey}`;
        const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
        const response = await fetch(totalUrl);
        const bodyAPI = await response.json();
        bodyNode[i]['poster_path'] = bodyAPI['poster_path'];
        bodyNode[i]['title'] = bodyAPI['title'];

        // check
        console.log('bbb');
        console.log(bodyNode);
        const transactionId = bodyNode[i]['id'];
        console.log(transactionId);
        if (bodyNode[i]['status'] === 'PENDING') {
          const urlWSBank = 'http://localhost:8080/ws-bank/Bank?WSDL';
          const responseWSBank = await fetch(urlWSBank, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/xml'
            },
            body: '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
              '    <soap:Body>\n' +
              '        <ns0:isExistTransaction xmlns:ns0="http://wsbank.org/">\n' +
              `            <billReceiver>${bodyAPI['va_receiver']}</billReceiver>\n` +
              `            <amount>${45000}</amount>\n` +
              `            <startTime>${bodyAPI['created_on']}</startTime>\n` +
              `            <endTime>${bodyAPI['created_on'] + 120}</endTime>\n` +
              '        </ns0:isExistTransaction>\n' +
              '    </soap:Body>\n' +
              '</soap:Envelope>\n'
          });
          const body = await responseWSBank.text();
          const xmlResp = $($.parseXML(body));
          const isExist = xmlResp.find("return").text();
          let updateStatusRequest = '';
          if (isExist === "true") {
            updateStatusRequest = "SUCCESS";
          } else {
            updateStatusRequest = "CANCELLED";
          }


          const responseNode2 = await fetch('http://localhost:5000/transaction/' + transactionId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
              status: updateStatusRequest
            })
          });
          const bodyNode = await responseNode2.json();
          console.log(bodyNode);
        }
      }

      setTransactionList(bodyNode);
      setLoaded(true);
    })();
  },[]);

  if (!loaded) {
    return <p>Loading...</p>
  }

  const TransactionStatus = ({status}) => {
    if (status === "PENDING") {
      return <Button variant="light">PENDING</Button>
    }
    if (status === "CANCELLED") {
      return <Button variant="danger">CANCELLED</Button>
    }
    if (status === "SUCCESS") {
      return <Button variant="success">SUCCESS</Button>
    }
  }

  return (
    <Container fluid={true}>
      <h2 className="font-weight-bold">TransactionHistory</h2>
      {transactionList.map(transaction => (
        <>
          <Row className="my-4">
            <Col xs={2}>
              <Image src={MovieDbAPI.baseUrlImage + transaction['poster_path']} rounded fluid style={{width: '154px'}}/>
            </Col>
            <Col xs={6} className="d-flex flex-column justify-content-center">
              <h5 className="font-weight-bolder">{transaction['title']}</h5>
              <p className="font-weight-bolder">
                <span className="text-primary">Movie Schedule: </span>
                {transaction['movie_schedule']}
              </p>
              <p className="font-weight-bolder">
                <span className="text-primary">Transaction Time: </span>
                {transaction['created_on']}
              </p>
              <TransactionStatus status={transaction['status']} />
            </Col>
            <Col xs={4} className="position-relative">
              <AddComment transactionStatus={transaction['status']} existsComment={true} transactionId={transaction['id']} />
            </Col>
          </Row>
          <hr style={{border: '1px solid #d9d9d9'}}/>
        </>
      ))}
    </Container>
  );
}

const AddComment = ({transactionStatus, existComment, transactionId}) => {
  if (transactionStatus !== 'SUCCESS') {
    return null;
  }
  if (existComment) {
    return (
      <>
        <Button variant="danger" href={"/schedules/" + transactionId} style={{position: 'absolute', bottom: 0, right: 0}}>Delete Review</Button>
        <Button variant="success" href={"/schedules/" + transactionId} style={{position: 'absolute', bottom: 50, right: 0}}>Edit Review</Button>
      </>
    )
  }
  return (
    <Button variant="primary" href={"/schedules/" + transactionId} style={{position: 'absolute', bottom: 0, right: 0}}>Add Review</Button>
  )
}