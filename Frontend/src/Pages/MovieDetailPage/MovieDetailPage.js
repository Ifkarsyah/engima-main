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
import cookies from "../../Utilities/Cookies";
import {Engima} from "../../Utilities/Engima";
import * as PropTypes from "prop-types";

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
    })();
  }, []);
  return (
    <Container fluid={true}>
      <Row className="mb-5">
        <MovieDetailSection movie={movie} genres={genres}/>
      </Row>

      <Row className="justify-content-between">
        <Col xs={7}>
          <MovieScheduleList movieId={movieId} movieReleaseDate={movie['release_date']}/>
        </Col>

        <Col xs={5}>
          <Card style={{border: '3px solid #d9d9d9'}}>
            <Card.Body className="bg-white">
              <h4 className="font-weight-bold">Review</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

function MovieScheduleList({movieId, movieReleaseDate}) {
  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        if (movieReleaseDate !== undefined)
        {
          const pathUrl = '/movies/' + movieId + '/schedules';
          const totalUrl = Engima.baseUrl + pathUrl + '?release_date=' + movieReleaseDate;
          const response = await fetch(totalUrl);
          const body = await response.json();
          for (let i = 0; i < body.length; i++){
            const d = new Date(body[i]['date_time']);
            body[i]['date'] = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            body[i]['time'] = d.toLocaleString([], { hour: 'numeric', minute: 'numeric', hour12: true });

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
      } catch (e) {
        console.log(e);
      }
    })();
  }, [movieReleaseDate]);
  return (
    <Card style={{border: '3px solid #d9d9d9'}}>
      <Card.Body>
        <h4 className="font-weight-bold">Schedule</h4>
        <Table responsive className="text-secondary">
          <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Available Seats</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {scheduleList.map(schedule => (
            <tr>
              <td>{schedule['date']}</td>
              <td>{schedule['time']}</td>
              <td>{schedule['availableSeats']}</td>
              <td className="text-primary font-weight-bolder">
                <Link to={"/booking/" + schedule['schedule_id']}>
                  <span className="mr-2">Book Now</span>
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