import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";
import cookies from "../../Utilities/Cookies";
import {Engima} from "../../Utilities/Engima";

export default function HomePage() {
  const [username, setUsername] = useState('default username');
  // useEffect(() => {
  //   (async () => {
  //     const pathUrl = '/token/username';
  //     const params = `?token=${cookies.get('token')}`;
  //     const totalUrl = Engima.baseUrl + pathUrl + params;
  //     const response = await fetch(totalUrl);
  //     const body = await response.json();
  //     setUsername(body.token);
  //   })();
  // }, []);
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
      const pathUrl = '/discover/movie';
      let params = `?api_key=${MovieDbAPI.apiKey}`;
      params += '&primary_release_date.gte=2019-11-12&primary_release_date.lte=2019-11-26&sort_by=popularity.desc';
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setMovieList(body.results.filter(movie => (movie['poster_path'] !== null)));
    })();
  }, []);
  return (
    <Container fluid={true} className="d-flex flex-wrap font-weight-bold">
      {movieList.map(movie => (
        <div key={movie['id']} className="m-3" style={{width: '154px'}}>
          <Link to={"/movies/" + movie['id']}>
            <Image src={MovieDbAPI.baseUrlImage + movie['poster_path']} rounded fluid style={{width: '154px'}}/>
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