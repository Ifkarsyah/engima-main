import cookies from "./Cookies";

export const Engima = {
  baseUrl: 'http://localhost/engima/Backend'
};

export async function getUserIdFromEngima() {
  let userId;
  const totalUrl = Engima.baseUrl + `/user/logged?token=${cookies.get('token')}`;
  const responseEngima = await fetch(totalUrl);
  const bodyEngima = await responseEngima.json();
  userId = bodyEngima.userId;
  return userId;
}