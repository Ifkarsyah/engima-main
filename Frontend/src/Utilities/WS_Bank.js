import $ from "jquery";

export const WS_Bank = {
  baseUrl: 'http://localhost:5000'
}

export async function soapCall(soapEnvelop) {
  const urlWSBank = 'http://ec2-3-85-110-209.compute-1.amazonaws.com:8080/ws-bank/Bank?WSDL';
  const responseWSBank = await fetch(urlWSBank, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml'
    },
    body: soapEnvelop
  });
  const body = await responseWSBank.text();
  return $($.parseXML(body));
}