import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {Engima, getUser} from "../../Utilities/Engima";
import cookies from "../../Utilities/Cookies";
import {useHistory} from "react-router";


export const AddComment = ({transactionStatus, transactionId, movieId, movieTitle}) => {
  const [existsComment, setExistsComment] = useState('not yet');
  const history = useHistory();

  const deleteComment = async () => {
    const respEngima = await fetch(Engima.baseUrl + '/reviews/' + transactionId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    const bodyEngimaResp = await respEngima.json();
    console.log(bodyEngimaResp);
    setExistsComment(false);
  };

  useEffect(() => {
    (async () => {
        const respEngima2 = await fetch(Engima.baseUrl + '/reviews/' + transactionId);
        const existCommentResponse = await respEngima2.json();
        setExistsComment(existCommentResponse.status);
    })();
  }, []);

  if (transactionStatus !== 'SUCCESS') {
    return null;
  }

  if (existsComment === 'not yet') {
    return <p>Loading...</p>
  }

  if (existsComment) {
    return (
      <>
        <Button variant="danger" style={{position: 'absolute', bottom: 0, right: 0}} onClick={deleteComment}>Delete
          Review</Button>
        <Button variant="success" href={"/reviews/" + transactionId}
                style={{position: 'absolute', bottom: 50, right: 0}}>Edit Review</Button>
      </>
    )
  } else {
    return (
      <Button variant="primary" href={"/reviews/" + transactionId + `?title=${movieTitle}&movieId=${movieId}`}
              style={{position: 'absolute', bottom: 0, right: 0}}>Add
        Review</Button>
    )
  }
}