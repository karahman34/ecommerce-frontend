import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "store/modules/auth/actions";
import { Button, Card, Form } from "react-bootstrap";
import Alert from "components/Alert/Alert";
import { getValidationErrorsObject } from "helpers/formHelper";

const mapDispatchToProps = (dispatch) => ({
  goRegister: (payload) => dispatch(register(payload)),
});

const Index = ({ goRegister }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    name: null,
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
      name: null,
      email: null,
      password: null,
    });

    try {
      await goRegister(form);
    } catch (err) {
      const errCode = err?.response?.status;

      if (errCode === 422) {
        setErrors(getValidationErrorsObject(err));
      } else {
        setFatalError(
          err?.response?.data?.message || "Failed to register user."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='register-page' className='page'>
      {fatalError && <Alert variant='danger'>{fatalError}</Alert>}

      <Card className='border-0 shadow auth-card'>
        <Card.Body>
          <Card.Title>
            <h4>Register</h4>
          </Card.Title>

          <Form onSubmit={formSubmitHandler}>
            {/* Name */}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name...'
                isInvalid={errors.name}
                onChange={(e) => setField("name", e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

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

            {/* Password Confirmation */}
            <Form.Group controlId='password_confirmation'>
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Repeat Password...'
                onChange={(e) =>
                  setField("password_confirmation", e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Already have an account ?</Link>

              <Button type='submit' variant='primary' disabled={loading}>
                {!loading ? "Register" : "Loading..."}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Index);
