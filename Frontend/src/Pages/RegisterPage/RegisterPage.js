import React from "react";
import { Button, Form } from "react-bootstrap";
import useForm from "react-hook-form";

function RegisterForm() {
    const { register, handleSubmit, errors } = useForm({ mode: "onChange" });
    const onSubmit = submitInfo => console.log(submitInfo); // TODO: call SOAP to WS-BANK

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Account Number Receiver</Form.Label>
                <Form.Control
                    name="accountNumberReceiver"
                    type="text"
                    placeholder="Insert receiver number(ex: 34562585)"
                    ref={register({
                        required: true,
                        pattern: {
                            value: /^[0-9]{7,8}$/,
                            message: "Account number must be the length of 7-8"
                        }
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.accountNumberReceiver && errors.accountNumberReceiver.message}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label column>Amount</Form.Label>
                <Form.Control
                    name="amount"
                    type="text"
                    placeholder="How many(ex: 250000)"
                    ref={register({ required: true, pattern: /\d+/ })}
                />
                <Form.Text className="text-danger">
                    {errors.amount && "Please enter number of amount"}
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" block>
                Transfer
            </Button>
        </Form>
    );
}

export default function RegisterPage() {
    return <RegisterForm />;
}
