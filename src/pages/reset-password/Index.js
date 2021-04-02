import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { getErrorCode, getValidationErrorsObject } from "helpers/formHelper";
import authApi from "api/authApi";
import Alert from "components/Alert/Alert";
import AuthLayoutStyles from "components/layouts/auth/AuthLayout.module.scss";

const Index = () => {
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    token: params.get("token"),
    email: params.get("email"),
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
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
      password: null,
    });
    setFatalError(false);

    try {
      await authApi.resetPassword(form);

      setSuccess("Your password has been reset!");
      setForm({
        token: null,
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      const errCode = getErrorCode(err);

      if (errCode === 422) {
        setErrors(getValidationErrorsObject(err));
      } else {
        setFatalError("Failed to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='reset-password-page' className={AuthLayoutStyles.page}>
      {success && <Alert variant='success'>{success}</Alert>}
      {fatalError && <Alert variant='danger'>{fatalError}</Alert>}

      <Card className='border-0 shadow auth-card'>
        <Card.Body>
          <Card.Title>
            <h4>Reset Password</h4>
          </Card.Title>

          <Form onSubmit={formSubmitHandler}>
            {/* Email */}
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                readOnly
                type='email'
                value={form.email}
              ></Form.Control>
            </Form.Group>

            {/* Password */}
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter New Password...'
                isInvalid={errors.password}
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password Confirmation */}
            <Form.Group controlId='password_confirmation'>
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Repeat New Password...'
                value={form.password_confirmation}
                onChange={(e) =>
                  setField("password_confirmation", e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Back to login page</Link>

              <Button type='submit' variant='primary' disabled={loading}>
                {!loading ? "Reset Password" : "Loading..."}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Index;
