import cookies from "./Cookies";

export const Engima = {
  baseUrl: 'http://localhost/engima/Backend'
};

export async function getUser() {
  let userId;
  const totalUrl = Engima.baseUrl + `/user/logged?token=${cookies.get('token')}`;
  const responseEngima = await fetch(totalUrl);
  return await responseEngima.json();
}