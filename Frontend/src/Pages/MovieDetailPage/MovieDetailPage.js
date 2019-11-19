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
        <Col xs={3}>
          <Image src={MovieDbAPI.baseUrlImage + movie['poster_path']} rounded fluid style={{width: '154px'}}/>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h3 className="font-weight-bolder">{movie['title']}</h3>
          <p className="font-weight-bold text-primary">{genres}</p>
          <p className="font-weight-bold text-secondary">Released date: {movie['release_date']}</p>
          <div style={{height:'17px'}} className="d-flex mb-3">
            <Image src="https://www.iconsdb.com/icons/preview/yellow/star-8-xxl.png"
                   rounded
                   fluid
                   style={{height:'17px'}}
                   className="mr-2"
            />
            <span>{movie['vote_average']} / 10</span>
          </div>
          <p>{movie['overview']}</p>
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col xs={7}>
          <Card style={{border: '3px solid #d9d9d9'}}>
            <Card.Body>
              <h4 className="font-weight-bold">Schedule</h4>
              <Table responsive className="text-secondary">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Available Seats</th>
                  <th> </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>2019-11-20</td>
                  <td>02:30 PM</td>
                  <td>30</td>
                  <td className="text-primary font-weight-bolder">
                    <Link to="/home" >
                      <span className="mr-2">Book Now</span>
                      <span className="bg-primary text-white rounded-circle h-100 vh-100">
                        &nbsp;&#8250;&nbsp;
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>2019-11-20</td>
                  <td>02:30 PM</td>
                  <td>30</td>
                  <td className="text-primary font-weight-bolder">
                    <Link to="/home" >
                      <span className="mr-2">Book Now</span>
                      <span className="bg-primary text-white rounded-circle h-100 vh-100">
                        &nbsp;&#8250;&nbsp;
                      </span>
                    </Link>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
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
