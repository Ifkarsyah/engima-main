const Authentication = {
  login(accountNumber) {
    if (accountNumber === "12345678") {
      sessionStorage.setItem("token", "dog");
      return true;
    }
    return false;
  },
  authenticate(token) {
    return token === "dog";
  },
  logout() {
    sessionStorage.removeItem("token");
  }
};

export default Authentication;
