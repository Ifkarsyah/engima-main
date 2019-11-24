import React, {useState} from "react";
import {useHistory, useLocation, useParams} from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import queryString from "query-string";
import {Button, Form} from "react-bootstrap";
import useForm from "react-hook-form";
import {request} from "../../Utilities/Request";
import ReactStars from "react-stars";
import {getUser} from "../../Utilities/Engima";

export default function ReviewPage() {
  const {transactionId} = useParams();
  const location = useLocation();
  const urlQueries = queryString.parse(location.search);
  let history = useHistory();
  const {register, handleSubmit} = useForm({mode: "onChange"});
  const [rating, setRating] = useState(0);

  const onSubmit = async review => {
    const user = await getUser();
    review['movieId'] = urlQueries['movieId'];
    review['rating'] = rating;
    let data = await request('/reviews/user/' + user.userId + '/transaction/' + transactionId,  'POST', review);
    history.push("/transactions");
  };
  const ratingChanged = newRating => setRating(newRating);

  return (
    <>
      <Row className="mb-5">
        <Col xs={1} className="d-flex flex-column justify-content-center">
          <Link to="/transactions" style={{textDecoration: "none"}}>
            <span className="text-primary" style={{fontSize: "40px"}}>❮</span>
          </Link>
        </Col>
        <Col xs={11} className="d-flex flex-column justify-content-center">
          <h3 className="font-weight-bolder">{urlQueries['title']}</h3>
        </Col>
      </Row>

      <Row className="mb-5 mt-5 d-flex justify-content-center">
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
              <Form.Label column xs={2} className="d-flex flex-column justify-content-center font-weight-bolder">Add
                Rating</Form.Label>
              <Col xs={10} className="d-flex flex-column justify-content-center">
                <ReactStars count={10} onChange={ratingChanged} size={30} color2={'#ffd700'} half={false}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column xs={2} className="font-weight-bolder">Add Review</Form.Label>
              <Col xs={10}>
                <Form.Control as="textarea" rows="3"
                              name="comment"
                              type="textarea"
                              ref={register({required: true})}
                              className="border-primary"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="d-flex flex-row-reverse">
              <Col xs={3}>
                <Button variant="primary" type="submit" className="mt-4 float-right" block>Submit</Button>
              </Col>
              <Col xs={3}>
                <Button variant="outline-secondary" href="/transactions" className="mt-4 float-right" block>Cancel</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <hr style={{border: "1px solid #d9d9d9"}}/>
    </>);
}
