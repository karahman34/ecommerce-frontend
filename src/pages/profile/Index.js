import {
  getErrorCode,
  setField,
  setValidationErrors,
} from "helpers/formHelper";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUserInfo } from "store/modules/auth/actions";
import Alert from "components/Alert/Alert";

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (payload) => dispatch(updateUserInfo(payload)),
});

const Index = ({ user, updateUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    telephone: user.profile.telephone,
    address: user.profile.address,
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    telephone: null,
    address: null,
  });
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({
      variant: null,
      message: null,
    });

    try {
      await updateUserInfo(form);

      setAlert({
        variant: "success",
        message: "Changes saved.",
      });
    } catch (err) {
      const errorCode = getErrorCode(err);

      if (errorCode === 422) {
        setValidationErrors(err, setErrors);
      } else {
        setAlert({
          variant: "danger",
          message: "Failed to update profile, please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {alert.message && alert.variant && (
        <Alert variant={alert.variant}>{alert.message}</Alert>
      )}

      <Card className='border-0 shadow-sm'>
        <Card.Body>
          <Card.Title>
            <i className='mdi mdi-account mr-2'></i>
            Profile
          </Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                placeholder='Name'
                isInvalid={errors.name !== null}
                onChange={(e) =>
                  setField("name", e.target.value, setForm, setErrors)
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={form.email}
                placeholder='Email'
                isInvalid={errors.email !== null}
                onChange={(e) =>
                  setField("email", e.target.value, setForm, setErrors)
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                value={form.telephone}
                placeholder='Telephone'
                isInvalid={errors.telephone !== null}
                onChange={(e) =>
                  setField("telephone", e.target.value, setForm, setErrors)
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.telephone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as='textarea'
                value={form.address}
                placeholder='Address'
                rows='3'
                isInvalid={errors.address !== null}
                onChange={(e) =>
                  setField("address", e.target.value, setForm, setErrors)
                }
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.telephone}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-end'>
              <Button
                type='submit'
                className='font-weight-medium'
                disabled={loading}
              >
                {!loading ? "Save Changes" : "Saving Changes"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
