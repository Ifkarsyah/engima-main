import {Engima} from "./Engima";

export const request = async (url, method, jsonBody) => {
  let response = await fetch(Engima.baseUrl + url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(jsonBody)
  });
  return response.json();
};