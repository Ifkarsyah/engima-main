import cookies from "./Cookies";

const Authentication = {
  authenticate(token) {
    return token === "dog";
  },
  logout() {
    cookies.remove('token');
  }
};

export default Authentication;
