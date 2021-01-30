import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notificationDeleteAction } from '../../actions/notificationAction';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function NotificationDelete(props) {
  const id =
    typeof props.match.params !== 'undefined' && typeof props.match.params.id !== 'undefined'
      ? props.match.params.id
      : null;

  const deleteAll = () => {
    if (id !== null) {
      props.notificationDeleteAction(id);
    } else {
      props.notificationDeleteAction();
    }
    setTimeout(() => {
      props.history.push('/notifications');
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        {id && <h2>Do you want to delete the notification?</h2>}
        {!id && <h2>Do you want to delete all the notifications?</h2>}
        <Button
          component={Link}
          to="/notifications"
          variant="contained"
          color="primary"
          style={{ marginRight: '20px' }}
        >
          CANCEL
        </Button>
        <Button variant="contained" color="secondary" onClick={deleteAll}>
          {id && 'YES, DELETE NOTIFICATION!'}
          {!id && 'YES, DELETE ALL OF THEM!'}
        </Button>
      </Container>
    </React.Fragment>
  );
}

NotificationDelete.propTypes = {
  math: PropTypes.any,
  errors: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  notificationDeleteAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationDeleteAction })(NotificationDelete);
