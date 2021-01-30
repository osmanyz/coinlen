import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { notificationsAction } from '../../actions/notificationAction';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Loading from '../../components/Loading/Loading';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NotificationItem from '../../hocs/NotificationItem';
import GetAppIcon from '@material-ui/icons/GetApp';
import PageTitle from '../../hocs/PageTitle';

const styles = (theme) => ({
  box: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.notificationsAction({
      page: this.state.page,
    });

    setTimeout(() => {
      if (!this.props.notifications.isNotificationsLoading) {
        this.setState({
          isLoading: false,
          data: this.props.notifications.data,
        });
      }
    }, 500);
  }

  loadMore() {
    this.setState({
      isInfinityLoading: true,
    });

    let page = this.state.page;
    page++;
    this.setState({
      page: page,
    });

    this.props.notificationsAction({
      page: page,
    });

    setTimeout(() => {
      if (!this.props.notifications.isNotificationsLoading && this.props.notifications.data.length > 0) {
        this.setState({
          isInfinityLoading: false,
        });
      } else {
        this.setState({
          isInfinityLoading: false,
        });
      }
    }, 500);
  }

  render() {
    const { isNotificationsLoading, data } = this.props.notifications;
    const { isInfinityLoading } = this.state;
    const { count } = this.props.notifications;

    if (isNotificationsLoading) {
      return <Loading type="small" />;
    }

    if (typeof data !== 'object' || data === null) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <Container className={this.props.classes.container} maxWidth="sm">
          <PageTitle>Notifications {count > 0 && count}</PageTitle>
          <div className={this.props.classes.box}>
            <List>
              {data.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nothings to show you." />
                </ListItem>
              )}
              {data.map((notification) => (
                <NotificationItem notification={notification} key={notification.id} />
              ))}
              {data.length > 0 && (
                <React.Fragment>
                  <Divider />
                  <ListItem button onClick={() => this.loadMore()} disabled={isInfinityLoading}>
                    <ListItemIcon>
                      <GetAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Load more!" />
                  </ListItem>
                </React.Fragment>
              )}
            </List>
          </div>
          <br />
          {count > 0 && (
            <Button component={Link} to="/notification-delete" startIcon={<DeleteForeverIcon />} color="secondary">
              Delete all the records!
            </Button>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.any,
  notifications: PropTypes.object.isRequired,
  notificationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationsAction })(withStyles(styles)(Notifications));
