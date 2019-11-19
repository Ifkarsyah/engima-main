import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {MovieDbAPI, movieDBRequest} from "../../Utilities/MovieDB";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";

export default function HomePage() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    (async () => {
      const pathUrl = '/movie/now_playing';
      const language = 'en-US';
      const page = 1;
      const params = `?api_key=${MovieDbAPI.apiKey}&language=${language}&page=${page}`;
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setUsername(body.token);
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

function MoviesList() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    (async () => {
      const pathUrl = '/movie/now_playing';
      const language = 'en-US';
      const page = 1;
      const params = `?api_key=${MovieDbAPI.apiKey}&language=${language}&page=${page}`;
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setMovieList(body.results);
    })();
  }, []);
  const baseURLImage = "https://image.tmdb.org/t/p/w154";
  return (
    <Container fluid={true} className="d-flex flex-wrap font-weight-bold">
      {movieList.map(movie => (
        <div key={movie['id']} className="m-3" style={{width: '154px'}}>
          <Link to={"/movies/" + movie['id']}>
            <Image src={baseURLImage + movie['poster_path']} rounded fluid style={{width: '154px'}}/>
          </Link>
          <p className="mb-0" style={{width: '154px'}}>{movie['title']}</p>
          <div style={{height:'17px'}} className="d-flex">
            <Image src="https://www.iconsdb.com/icons/preview/yellow/star-8-xxl.png"
                   rounded
                   fluid
                   style={{height:'17px'}}
                   className="mr-2"
            />
            <span>{movie['vote_average']}</span>
          </div>
        </div>
      ))}
    </Container>
  );
}