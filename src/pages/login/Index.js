import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenthicate } from "store/modules/auth/actions";
import { Button, Card, Form } from "react-bootstrap";
import { getValidationErrorsObject } from "helpers/formHelper";
import Alert from "components/Alert/Alert";
import AuthLayoutStyles from "components/layouts/auth/AuthLayout.module.scss";
import { fetchUserCarts } from "store/modules/cart/actions";

const mapDispatchToProps = (dispatch) => ({
  goLogin: (payload) => dispatch(authenthicate(payload)),
  fetchUserCartItems: () => dispatch(fetchUserCarts()),
});

const Index = ({ goLogin, fetchUserCartItems }) => {
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
    setFatalError(false);
    setErrors({
      email: null,
      password: null,
    });

    try {
      await goLogin(form);

      const params = new URLSearchParams(window.location.search);

      if (params.has("origin")) {
        window.location.href = decodeURI(params.get("origin"));
      } else {
        fetchUserCartItems(fetchUserCartItems);
      }
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
    <div id='login-page' className={AuthLayoutStyles.page}>
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
                tabIndex='1'
                onChange={(e) => setField("email", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group controlId='password'>
              <div className='d-flex align-items-center justify-content-between'>
                <Form.Label>Password</Form.Label>
                <Link to='/forgot-password'>Forgot Password ?</Link>
              </div>

              <Form.Control
                type='password'
                placeholder='Enter Password...'
                isInvalid={errors.password}
                tabIndex='2'
                onChange={(e) => setField("password", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/register'>Don't have an account ?</Link>

              <Button
                type='submit'
                variant='primary'
                disabled={loading}
                tabIndex='3'
              >
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
