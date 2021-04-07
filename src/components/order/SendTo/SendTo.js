import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const SendTo = ({ user }) => {
  return (
    <Card className='border-0 shadow-sm bg-primary text-white'>
      <Card.Body>
        <Card.Title className='text-primary header-title--dash text-white'>
          <i className='mdi mdi-truck mr-2'></i>
          Send To
        </Card.Title>

        {/* Name */}
        <div className='mb-2 font-weight-medium'>{user.name}</div>

        {/* Address */}
        <div className='mb-2 font-weight-medium'>{user.profile.address}</div>

        {/* Telephone */}
        <div className='font-weight-medium'>{user.profile.telephone}</div>
      </Card.Body>
    </Card>
  );
};

export default connect(mapStateToProps)(SendTo);
