import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Switch from "react-bootstrap/cjs/Switch";
import LoginPage from "./Pages/LoginPage/LoginPage";
import GeneralPage from "./Pages/GeneralPage";
import HomePage from "./Pages/HomePage/HomePage";
import TransactionsPage from "./Pages/TransactionsPage/TransactionsPage";
import Error404Page from "./Pages/Error404Page/Error404Page";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MovieDetailPage from "./Pages/MovieDetailPage/MovieDetailPage";
import ReviewPage from "./Pages/ReviewPage/ReviewPage";
import BookingPage from "./Pages/BookingPage/BookingPage";
import GeneralForm from "./Components/Navbar/GeneralForm";
import SearchPage from "./Pages/SearchPage/SearchPage";
import {useHistory} from "react-router";

function Switcher() {
  return (
    <Switch className="h-100 w-100 pl-0">


      <Route path="/login">
        <GeneralForm title="Welcome to Engima">
          <LoginPage/>
        </GeneralForm>
      </Route>

      <Route path="/register">
        <GeneralForm title="Welcome to Engima">
          <RegisterPage/>
        </GeneralForm>
      </Route>

      <Route path="/home">
        <GeneralPage title="Homepage">
          <HomePage/>
        </GeneralPage>
      </Route>

      <Route path="/search">
        <GeneralPage title="Search">
          <SearchPage/>
        </GeneralPage>
      </Route>

      <Route path="/movies/:movieId">
        <GeneralPage title="MovieDetail">
          <MovieDetailPage/>
        </GeneralPage>
      </Route>

      <Route path="/booking/:scheduleId">
        <GeneralPage title="Booking Ticket">
          <BookingPage/>
        </GeneralPage>
      </Route>

      <Route path="/transactions">
        <GeneralPage title="Transaction History">
          <TransactionsPage/>
        </GeneralPage>
      </Route>

      <Route path="/reviews/:transactionId">
        <GeneralPage title="Review">
          <ReviewPage/>
        </GeneralPage>
      </Route>

      <Route path="/404">
        <GeneralPage title="Error 404">
          <Error404Page/>
        </GeneralPage>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Switcher/>
      </Router>
    </>

  );
}
