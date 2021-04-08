import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Alert from "components/Alert/Alert";
import authApi from "api/authApi";
import {
  getErrorCode,
  setField,
  setValidationErrors,
} from "helpers/formHelper";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    current_password: null,
    password: null,
  });
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  async function updatePasswordHandler(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({
      variant: null,
      message: null,
    });

    try {
      await authApi.changePassword(form);

      setAlert({
        variant: "success",
        message: "Password updated.",
      });

      setForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      const errCode = getErrorCode(err);

      if (errCode === 422) {
        setValidationErrors(err, setErrors);
      } else {
        setAlert({
          variant: "danger",
          message: "Failed to update password, please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {alert.variant && alert.message && (
        <Alert variant={alert.variant}>{alert.message}</Alert>
      )}

      <Card className='border-0 shadow-sm'>
        <Card.Body>
          <Card.Title>
            <i className='mdi mdi-lock mr-2'></i>
            Password
          </Card.Title>

          <Form onSubmit={updatePasswordHandler}>
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type='password'
                value={form.current_password}
                isInvalid={errors.current_password}
                placeholder='Current Password'
                onChange={(e) =>
                  setField(
                    "current_password",
                    e.target.value,
                    setForm,
                    setErrors
                  )
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.current_password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                value={form.password}
                isInvalid={errors.password}
                placeholder='New Password'
                onChange={(e) =>
                  setField("password", e.target.value, setForm, setErrors)
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Repeat New Password</Form.Label>
              <Form.Control
                type='password'
                value={form.password_confirmation}
                placeholder='Repeat New Password'
                onChange={(e) =>
                  setField(
                    "password_confirmation",
                    e.target.value,
                    setForm,
                    setErrors
                  )
                }
              ></Form.Control>
            </Form.Group>

            <div className='d-flex justify-content-end'>
              <Button type='submit' disabled={loading}>
                {!loading ? "Update Password" : "Updating Password"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Index;
