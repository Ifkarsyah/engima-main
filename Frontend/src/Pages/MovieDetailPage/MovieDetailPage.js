import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {Engima} from "../../Utilities/Engima";
import * as PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

function MovieDetailSection(props) {
  return <>
    <Col xs={3}>
      <Image src={MovieDbAPI.baseUrlImage + props.movie["poster_path"]} rounded fluid style={{width: "154px"}}/>
    </Col>
    <Col xs={8} className="d-flex flex-column justify-content-center">
      <h3 className="font-weight-bolder">{props.movie["title"]}</h3>
      <p className="font-weight-bold text-primary">{props.genres}</p>
      <p className="font-weight-bold text-secondary">Released date: {props.movie["release_date"]}</p>
      <div style={{height: "17px"}} className="d-flex mb-3">
        <Image src="https://www.iconsdb.com/icons/preview/yellow/star-8-xxl.png"
               rounded
               fluid
               style={{height: "17px"}}
               className="mr-2"
        />
        <span>{props.movie["vote_average"]} / 10</span>
      </div>
      <p>{props.movie["overview"]}</p>
    </Col>
  </>;
}

MovieDetailSection.propTypes = {
  movie: PropTypes.shape({}),
  genres: PropTypes.string
};



export default function MovieDetail() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState('');
  const [reviewMovieDB, setReviewMovieDB] = useState([]);
  const [engimaReview, setEngimaReview] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const pathUrl = '/movie/' + movieId;
      let params = `?api_key=${MovieDbAPI.apiKey}`;
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setMovie(body);
      let bodyGenreString = body['genres'].map(genre => genre['name']);
      setGenres(bodyGenreString.join(' | '));


      const totalUrl2 = MovieDbAPI.baseUrl + '/movie/' + movieId + '/reviews' + `?api_key=${MovieDbAPI.apiKey}`;
      const response2 = await fetch(totalUrl2);
      const body2 = await response2.json();
      setReviewMovieDB(body2.results.slice(0,3));

      const totalUrl3 = Engima.baseUrl + '/movies/' + movieId + '/reviews';
      const response3 = await fetch(totalUrl3);
      const body3 = await response3.json();
      setEngimaReview(body3.results);

      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <Container fluid={true}>
      <Row className="mb-5">
        <MovieDetailSection movie={movie} genres={genres}/>
      </Row>

      <Row className="justify-content-between">
        <Col xs={7}>
          <MovieScheduleList movieId={movieId} movieReleaseDate={movie['release_date']} title={movie['title']}/>
        </Col>

        <Col xs={5}>
          <Card style={{border: '3px solid #d9d9d9'}}>
            <Card.Body className="bg-white">
              <h4 className="font-weight-bold text-center">MovieDB Review</h4>
              {reviewMovieDB.map(review => (
                <>
                  <Card style={{border: '3px solid white'}} key={review['id']} className="my-1">
                    <Card.Body className="bg-white">
                      <h6 className="font-weight-bold text-primary">{review['author']}</h6>
                      <p>{review['content'].substring(0, 60)} ... </p>
                    </Card.Body>
                  </Card>
                  <hr style={{border: "1px solid #d9d9d9"}}/>
                </>
              ))}
            </Card.Body>
          </Card>
          <Card style={{border: '3px solid #d9d9d9'}} className="my-3">
            <Card.Body className="bg-white">
              <h4 className="font-weight-bold text-center">Engima Review</h4>
              {engimaReview.map(review => (
                <>
                  <Card style={{border: '3px solid white'}} key={review['id']} className="my-1">
                    <Card.Body className="bg-white">
                      <h6 className="font-weight-bold text-primary">{review['username']}</h6>
                      <p>{review['comment'].substring(0, 60)} ... </p>
                    </Card.Body>
                  </Card>
                  <hr style={{border: "1px solid #d9d9d9"}}/>
                </>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

function MovieScheduleList({movieId, movieReleaseDate, title}) {
  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        if (movieReleaseDate !== undefined) {
          const pathUrl = '/movies/' + movieId + '/schedules';
          const totalUrl = Engima.baseUrl + pathUrl + '?release_date=' + movieReleaseDate;
          const response = await fetch(totalUrl);
          const body = await response.json();
          for (let i = 0; i < body.length; i++) {
            const d = new Date(body[i]['date_time']);
            body[i]['date'] = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            body[i]['time'] = d.toLocaleString([], {hour: 'numeric', minute: 'numeric', hour12: true});

            const seatString = body[i]['seats'];
            const seatInteger = parseInt(seatString);
            const seatBinary = seatInteger.toString(2);

            let seatAvailableCount = 0;
            for (let i = 0; i < seatBinary.length; i++) {
              if (seatBinary[i] === '1') seatAvailableCount++;
            }
            body[i]['availableSeats'] = seatAvailableCount;
          }
          setScheduleList(body);
        }
      } catch (e) {}
    })();
  }, [movieReleaseDate]);
  return (
    <Card style={{border: '3px solid #d9d9d9'}}>
      <Card.Body>
        <h4 className="font-weight-bold">Schedule</h4>
        <Table responsive className="text-secondary">
          <thead>
          <tr>
            <th style={{borderTopColor: "white"}}>Date</th>
            <th style={{borderTopColor: "white"}}>Time</th>
            <th style={{borderTopColor: "white"}}>Available Seats</th>
            <th style={{borderTopColor: "white"}}>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {scheduleList.map(schedule => (
            <tr>
              <td>{schedule['date']}</td>
              <td>{schedule['time']}</td>
              <td>{schedule['availableSeats']}</td>
              <td className="text-primary font-weight-bolder">
                <Link to={"/booking/" + schedule['schedule_id'] + '?title=' + title + '&movieId=' + movieId}>
                  <span className="mr-2" style={{textDecoration: 'none'}}>Book Now</span>
                  <span className="bg-primary text-white rounded-circle h-100 vh-100">
                &nbsp;&#8250;&nbsp;
              </span>
                </Link>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}