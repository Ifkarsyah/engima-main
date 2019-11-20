import React from "react";
import {Button, Form} from "react-bootstrap";
import useForm from "react-hook-form";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import cookies from "../../Utilities/Cookies";
import {request} from "../../Utilities/Request";

function LoginForm() {
  let history = useHistory();
  const {register, handleSubmit, errors} = useForm({mode: "onChange"});
  const onSubmit = async jsonBody => {
    let data = await request('/login',  'POST', jsonBody);
    if (data.isUserExists) {
      cookies.set('token', data.token, { path: '/' });
      history.push("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label column={false}>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="john@doe.com"
          ref={register({
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please insert a valid email address!"
            }
          })}
          className="border-primary"
        />
        <Form.Text className="text-danger">
          {errors.email && errors.email.message} &nbsp;
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="place here"
          ref={register({required: true})}
        />
        <Form.Text className="text-danger">
          {errors.password && "Please insert your password!"} &nbsp;
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" block className="mt-4">
        Login
      </Button>

      <Form.Text className="text-center mt-4 font-weight-bold">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-primary"> Register here </Link>
      </Form.Text>
    </Form>
  );
}

export default function LoginPage() {
  return (
    <>
      <LoginForm/>
    </>
  )
}
