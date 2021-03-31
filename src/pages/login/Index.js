import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenthicate } from "store/modules/auth/actions";
import { Button, Card, Form } from "react-bootstrap";
import Alert from "components/Alert/Alert";
import { getValidationErrorsObject } from "helpers/formHelper";

const mapDispatchToProps = (dispatch) => ({
  goLogin: (payload) => dispatch(authenthicate(payload)),
});

const Index = ({ goLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
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

    try {
      await goLogin(form);
    } catch (err) {
      const errCode = err?.response?.status;

      if (errCode === 422) {
        setErrors(getValidationErrorsObject(err));
      } else {
        setFatalError(
          err?.response?.data?.message || "Failed to authenthicate user."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='login-page' className='page'>
      {fatalError && <Alert variant='danger'>{fatalError}</Alert>}

      <Card className='border-0 shadow auth-card'>
        <Card.Body>
          <Card.Title>
            <h4>Login</h4>
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

            {/* Password */}
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password...'
                isInvalid={errors.password}
                onChange={(e) => setField("password", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/register'>Don't have an account ?</Link>

              <Button type='submit' variant='primary' disabled={loading}>
                {!loading ? "Login" : "Loading..."}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Index);
