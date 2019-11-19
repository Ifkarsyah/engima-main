import {engimaUrl} from "../constant";

export const request = async (url, method, jsonBody) => {
  let response = await fetch(engimaUrl + url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(jsonBody)
  });
  return response.json();
};