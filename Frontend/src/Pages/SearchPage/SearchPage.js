import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {MovieDbAPI} from "../../Utilities/MovieDB";
import {Link, useLocation} from "react-router-dom";
import Image from "react-bootstrap/Image";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function SearchPage() {
  const location = useLocation();

  const [movieList, setMovieList] = useState([]);
  const [totalResult, setTotalResult] = useState();
  const [totalPage, setTotalPage] = useState();
  const urlQueries = queryString.parse(location.search);
  const keyword = urlQueries['keyword'];
  const page = urlQueries['page'];

  useEffect(() => {
    (async () => {
      const pathUrl = '/search/movie';
      let params = `?api_key=${MovieDbAPI.apiKey}`;
      params += `&language=en-US&query=${keyword}&page=${page}&include_adult=false`;
      const totalUrl = MovieDbAPI.baseUrl + pathUrl + params;
      const response = await fetch(totalUrl);
      const body = await response.json();
      setMovieList(body.results);
      setTotalPage(body['total_pages']);
      setTotalResult(body['total_results']);
    })();
  });


  let paginations = [];
  for (let i = 0; i <= totalPage; i++) {
    paginations.push(
      <div style={{border: '2px solid #00C1EC'}} className="mx-1">
        <Link to={"/search?keyword=" + keyword + "&page=" + (i + 1)}>
          &nbsp;{i + 1}&nbsp;
        </Link>
      </div>
    )
  }

  return (
    <Container fluid={true}>
      <h4 className="font-weight-bold">Showing search result for keyword "{keyword}"</h4>
      <h6>{totalResult} result available.</h6>
      {movieList.map(movie => (
        <>
          <Row className="my-4">
            <Col xs={2}>
              <Image src={MovieDbAPI.baseUrlImage + movie['poster_path']} rounded fluid style={{width: '154px'}}/>
            </Col>
            <Col xs={8} className="d-flex flex-column justify-content-center">
              <h5 className="font-weight-bolder">{movie['title']}</h5>
              <div style={{height: '17px'}} className="d-flex mb-3">
                <Link to={"/movies/" + movie['id']}>
                  <Image src="https://www.iconsdb.com/icons/preview/yellow/star-8-xxl.png"
                         rounded
                         fluid
                         style={{height: '17px'}}
                         className="mr-2"
                  />
                </Link>
                <span>{movie['vote_average']}</span>
              </div>
              <p style={{fontSize: '13px'}}>{movie['overview']}</p>
            </Col>
            <Col xs={2} className="position-relative">
              <Link to={"/movies/" + movie['id']} style={{position: 'absolute', bottom: 0, right: 0}}
                    className="pb-3 pr-2">
                <span className="mr-2">View Details</span>
                <span className="bg-primary text-white rounded-circle h-100 vh-100">
                        &nbsp;&#8250;&nbsp;
                      </span>
              </Link>
            </Col>
          </Row>
          <hr style={{border: '1px solid #d9d9d9'}}/>
        </>
      ))}
      <div className="d-flex justify-content-center">
        {paginations}
      </div>
    </Container>
  );
}
