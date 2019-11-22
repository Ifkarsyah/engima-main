import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import Image from "react-bootstrap/Image";
import {Link, useHistory} from "react-router-dom";
import cookies from "../../Utilities/Cookies";
import {Engima} from "../../Utilities/Engima";
import * as PropTypes from "prop-types";
import {MovieRating} from "./MovieRating";

export default function HomePage() {
  const [username, setUsername] = useState('');
  const history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const pathUrl = '/user/logged';
        const params = `?token=${cookies.get('token')}`;
        const totalUrl = Engima.baseUrl + pathUrl + params;
        const response = await fetch(totalUrl);
        const body = await response.json();
        setUsername(body.username);
      } catch (e) {
        history.push('/login');
      }
    })();
  }, []);
  return (
    <Container fluid={true}>
      <h3 className="mt-3 mb-4">
        <span>Hello, </span>
        <span className="text-primary">{username}</span>
      </h3>
      <h5 className="font-weight-bold mb-5">Now Playing</h5>
      <MoviesList/>
    </Container>
  );
}

function MovieCard(props) {
  return <div className="m-3" style={{width: "154px"}}>
    <Link to={"/movies/" + props.movie["id"]}>
      <Image src={MovieDbAPI.baseUrlImage + props.movie["poster_path"]} rounded fluid style={{width: "154px"}}/>
    </Link>
    <p className="mb-0" style={{width: "154px"}}>{props.movie["title"]}</p>
    <MovieRating rating={props.movie["vote_average"]}/>
  </div>;
}

MovieCard.propTypes = {movie: PropTypes.any};

function MoviesList() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    (async () => {
      const pathUrl = '/discover/movie';
      let params = `?api_key=${MovieDbAPI.apiKey}`;
      const d = new Date();
      d.setDate(d.getDate() - 7);
      const dayString = d.toISOString().slice(0, 10);
      params += `&primary_release_date.gte=${dayString}&primary_release_date.lte=2019-11-26&sort_by=popularity.desc`;
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setMovieList(body.results.filter(movie => (movie['poster_path'] !== null)));
    })();
  }, []);
  return (
    <Container fluid={true} className="d-flex flex-wrap font-weight-bold">
      {movieList.map(movie => <MovieCard key={movie['id']} movie={movie}/>)}
    </Container>
  );
}