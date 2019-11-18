import React from "react";
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
import GeneralForm from "./Components/Navbar/GeneralForm";

function Switcher() {
    return (
        <Switch className="h-100">
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
            <Switcher/>
        </Router>
    );
}
