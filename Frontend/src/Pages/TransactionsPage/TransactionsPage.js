import React, {useEffect, useState} from "react";
import {moviedb_GetMovieDetail} from "../../Utilities/MovieDB";
import Container from "react-bootstrap/Container";
import {getUserIdFromEngima} from "../../Utilities/Engima";
import {WS_Transaksi} from "../../Utilities/WS_Transaksi";
import {soapCall} from "../../Utilities/WS_Bank";
import {UserTransaction} from "./UserTransaction";

export default function TransactionsPage() {
  const [transactionList, setTransactionList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let userId = await getUserIdFromEngima();

      const responseWS_Transaksi = await fetch(WS_Transaksi.baseUrl + '/transaction/' + userId);
      const userTransactions = await responseWS_Transaksi.json();
      for (let i = 0; i < userTransactions.length; i++){
        // for each transaction found, get the title f
        const movieDetail = await moviedb_GetMovieDetail(userTransactions[i]['movie_id']);
        userTransactions[i]['poster_path'] = movieDetail['poster_path'];
        userTransactions[i]['title'] = movieDetail['title'];

        // check
        const transactionId = userTransactions[i]['id'];
        const transactionTime = Date.parse(userTransactions[i]['created_on']);
        const virtual_account = userTransactions[i]['va_receiver'];


        if (userTransactions[i]['status'] === 'PENDING') {
          const xmlResp = await soapCall(
            '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n' +
            '    <soap:Body>\n' +
            '        <ns0:isExistTransaction xmlns:ns0="http://wsbank.org/">\n' +
            `            <billReceiver>${virtual_account}</billReceiver>\n` +
            `            <billSender>${10000001}</billSender>\n` +
            `            <amount>${45000}</amount>\n` +
            `            <startTime>${transactionTime - 1}</startTime>\n` +
            `            <endTime>${transactionTime + 1200000000000000}</endTime>\n` +
            '        </ns0:isExistTransaction>\n' +
            '    </soap:Body>\n' +
            '</soap:Envelope>\n'
          );
          const isExist = xmlResp.find("return").text();
          let updateStatusRequest = "PENDING";
          console.log('isExist', isExist);
          console.log(transactionTime);
          console.log('minute', Date.now() - transactionTime);
          if (Date.now() - transactionTime <= 1200000) {
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

