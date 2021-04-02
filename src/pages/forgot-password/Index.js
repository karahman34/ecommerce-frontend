import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { getValidationErrorsObject } from "helpers/formHelper";
import Alert from "components/Alert/Alert";
import authApi from "api/authApi";

const Index = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fatalError, setFatalError] = useState(null);

  const setField = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });

    if (errors[key] !== null)
      setErrors({
        ...errors,
        [key]: null,
      });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({
      email: null,
    });
    setFatalError(false);

    try {
      await authApi.forgotPassword(form);

      setSuccess("Reset password link has been send to your email.");
    } catch (err) {
      const errCode = err?.response?.status;

      if (errCode === 422) {
        setErrors(getValidationErrorsObject(err));
      } else {
        setFatalError("Failed to send forgot password mail.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='forgot-password-page' className='page'>
      {success && <Alert variant='success'>{success}</Alert>}
      {fatalError && <Alert variant='danger'>{fatalError}</Alert>}

      <Card className='border-0 shadow auth-card'>
        <Card.Body>
          <Card.Title>
            <h4>Forgot Password</h4>
          </Card.Title>

          <Form onSubmit={formSubmitHandler}>
            {/* Email */}
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email...'
                isInvalid={errors.email}
                onChange={(e) => setField("email", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Back to login page</Link>

              <Button type='submit' variant='primary' disabled={loading}>
                {!loading ? "Send Password Reset Link" : "Loading..."}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Index;
