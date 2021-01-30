import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Button, NonIdealState, Classes } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { notificationsAction } from '../../actions/notificationAction';
import NotificationItem from './components/NotificationItem';
import NotificationSkeleton from './components/NotificationSkeleton';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      isLoading: true,
      isDisableLoading: false,
      isInfinityLoading: false,
      data: [],
    };

    this.headTitle = document.title;
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

    document.title = 'Notifications | ' + this.headTitle;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.notificationsAction({
        page: this.state.page,
      });
    }
    if (this.props.location.key !== prevProps.location.key) {
      this.setState({
        isLoading: true,
        isDisableLoading: false,
        isInfinityLoading: false,
      });
      this.props.notificationsAction({
        page: this.state.page,
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
          isDisableLoading: false,
          isInfinityLoading: false,
          data: this.props.notifications.data,
        });
        if (this.props.notifications.data.length === 0) {
          setTimeout(() => {
            this.setState({
              data: this.props.notifications.data,
            });
          }, 1000);
        }
      }, 1500);

      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    document.title = this.headTitle;
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
          isLoading: false,
        });

        this.setState({
          isInfinityLoading: false,
          data: this.state.data.concat(this.props.notifications.data),
        });
      } else if (!this.props.notifications.isNotificationsLoading && this.props.notifications.data.length === 0) {
        this.setState({
          isDisableLoading: true,
          isInfinityLoading: false,
          page: this.props.notifications.page,
        });
      } else {
        this.setState({
          isLoading: false,
          isInfinityLoading: false,
        });
      }
    }, 500);
  }

  render() {
    const { isLoading, isInfinityLoading, isDisableLoading, data } = this.state;
    const { count } = this.props.notifications;

    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            {count !== 0 && (
              <h3>
                Notifications
                <small className={classnames(Classes.TEXT_MUTED, 'float-right')}>Total {count} notifications</small>
              </h3>
            )}
            {isLoading && <NotificationSkeleton />}
            {!isLoading && data.length === 0 && (
              <div style={{ marginTop: 20 }}>
                <NonIdealState
                  icon={IconNames.NOTIFICATIONS_UPDATED}
                  title="There is no notification..."
                  description={
                    'Notifications will be generated automatically by the system in case of any opportunity.'
                  }
                />
              </div>
            )}
            {!isLoading &&
              data.length > 0 &&
              data.map((notification) => (
                <Link
                  to={`/notification/${notification.id}/${notification.name}`}
                  className={'callout-item-link'}
                  key={notification.id}
                >
                  <NotificationItem notification={notification} />
                </Link>
              ))}
            {!isLoading && data.length > 11 && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => this.loadMore()}
                  loading={isInfinityLoading}
                  disabled={isDisableLoading}
                  icon={IconNames.DOUBLE_CHEVRON_DOWN}
                  style={{ marginTop: 10, marginBottom: 20 }}
                >
                  View more
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.object.isRequired,
  notificationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationsAction })(Notifications);
