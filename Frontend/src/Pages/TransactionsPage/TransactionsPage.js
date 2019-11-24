import React, {useEffect, useState} from "react";
import {moviedb_GetMovieDetail} from "../../Utilities/MovieDB";
import Container from "react-bootstrap/Container";
import {getUser} from "../../Utilities/Engima";
import {WS_Transaksi} from "../../Utilities/WS_Transaksi";
import {soapCall} from "../../Utilities/WS_Bank";
import {UserTransaction} from "./UserTransaction";

export default function TransactionsPage() {
  const [transactionList, setTransactionList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let user = await getUser();

      const responseWS_Transaksi = await fetch(WS_Transaksi.baseUrl + '/transaction/' + user.userId);
      const userTransactions = await responseWS_Transaksi.json();


      for (let i = 0; i < userTransactions.length; i++){
        // for each transaction found, get the title f
        const movieDetail = await moviedb_GetMovieDetail(userTransactions[i]['movie_id']);
        userTransactions[i]['poster_path'] = movieDetail['poster_path'];
        userTransactions[i]['title'] = movieDetail['title'];

        // check
        const transactionId = userTransactions[i]['id'];
        const transactionTime = Math.floor(Date.parse(userTransactions[i]['created_on'])/1000);


        // for each pending status
        const virtual_account = userTransactions[i]['va_receiver'];
        if (userTransactions[i]['status'] === 'PENDING') {

          const xmlResp = await soapCall(
            '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\n' +
            '    <SOAP-ENV:Header/>\n' +
            '    <S:Body>\n' +
            '        <ns2:isExistTransaction xmlns:ns2="http://wsbank.org/">\n' +
            `            <username>${user.username}</username>\n` +
            `            <billReceiver>${virtual_account}</billReceiver>\n` +
            `            <amount>${45000}</amount>\n` +
            `            <startTime>${transactionTime}</startTime>\n` +
            `            <endTime>${transactionTime + 120}</endTime>\n` +
            '        </ns2:isExistTransaction>\n' +
            '    </S:Body>\n' +
            '</S:Envelope>\n'
          );
          const isExist = xmlResp.find("return").text();
          let updateStatusRequest = "PENDING";
          if (Math.floor(Date.now()/1000) - transactionTime <= 120) {
            if (isExist === "true") {
              updateStatusRequest = "SUCCESS";
            }
          } else {
            if (isExist === "false") {
              updateStatusRequest = "CANCELLED";
            }
          }

          if (updateStatusRequest !== "PENDING") {
            const responseNode2 = await fetch(WS_Transaksi.baseUrl + '/transaction/' + transactionId, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
              body: JSON.stringify({status: updateStatusRequest})
            });
            const bodyNode = await responseNode2.json();
            console.log(bodyNode);
          }
        }
      }

      setTransactionList(userTransactions);
      setLoaded(true);
    })();
  },[]);

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <Container fluid={true}>
      <h2 className="font-weight-bold">TransactionHistory</h2>
      {transactionList.map(transaction => (
        <UserTransaction transaction={transaction}/>
      ))}
    </Container>
  );
}

