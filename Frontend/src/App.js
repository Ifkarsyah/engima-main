import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Switch from "react-bootstrap/cjs/Switch";
import PrivateRoute from "./Utilities/PrivateRoute";
import LoginPage from "./Pages/LoginPage/LoginPage";
import GeneralPage from "./Pages/GeneralPage";
import HomePage from "./Pages/HomePage/HomePage";
import TransactionsPage from "./Pages/TransactionsPage/TransactionsPage";
import Error404Page from "./Pages/Error404Page/Error404Page";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MovieDetailPage from "./Pages/MovieDetailPage/MovieDetailPage";
import ReviewPage from "./Pages/ReviewPage/ReviewPage";
import BookingPage from "./Pages/BookingPage/BookingPage";
import NavbarEngima from "./Components/Navbar/NavbarEngima";

function Switcher() {
    return (
        <Switch>
            <Route path="/login">
                <GeneralPage title="Login">
                    <LoginPage/>
                </GeneralPage>
            </Route>

            <Route path="/register">
                <GeneralPage title="Register">
                    <RegisterPage/>
                </GeneralPage>
            </Route>

            <PrivateRoute path="/home">
                <GeneralPage title="Homepage">
                    <HomePage/>
                </GeneralPage>
            </PrivateRoute>

            <PrivateRoute path="/movies/:movieId">
                <GeneralPage title="MovieDetail">
                    <MovieDetailPage/>
                </GeneralPage>
            </PrivateRoute>

            <PrivateRoute path="/booking/:scheduleId">
                <GeneralPage title="Booking Ticket">
                    <BookingPage/>
                </GeneralPage>
            </PrivateRoute>

            <PrivateRoute path="/transactions">
                <GeneralPage title="Transaction History">
                    <TransactionsPage/>
                </GeneralPage>
            </PrivateRoute>

            <PrivateRoute path="/review/:transactionId">
                <GeneralPage title="Review">
                    <ReviewPage/>
                </GeneralPage>
            </PrivateRoute>

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
        <Router>
            <NavbarEngima/>
            <Switcher/>
        </Router>
    );
}
