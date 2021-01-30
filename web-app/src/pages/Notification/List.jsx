import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { Button, NonIdealState, Classes } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { notificationsAction } from '../../actions/notificationAction';
import NotificationItem from './components/NotificationItem';
import NotificationSkeleton from './components/NotificationSkeleton';
import PremiumControl from '../Payment/components/PremiumControl';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      isDisableLoading: false,
      isInfinityLoading: false,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.notificationsAction({
      page: this.state.page,
    });

    document.title = 'Notifications | Coinlen';
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.notificationsAction({
        page: this.state.page,
      });
    }
    if (this.props.location.key !== prevProps.location.key) {
      this.setState({
        isDisableLoading: false,
        isInfinityLoading: false,
      });
      this.props.notificationsAction({
        page: this.state.page,
      });

      this.forceUpdate();
    }
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
      } else if (!this.props.notifications.isNotificationsLoading && this.props.notifications.data.length === 0) {
        this.setState({
          isDisableLoading: true,
          isInfinityLoading: false,
          page: this.props.notifications.page,
        });
      } else {
        this.setState({
          isInfinityLoading: false,
        });
      }
    }, 500);
  }

  render() {
    if (moment(this.props.auth.user.premiumDate) < new Date()) {
       return <PremiumControl auth={this.props.auth} />;
     }

    const { isInfinityLoading, isDisableLoading } = this.state;
    const { isNotificationsLoading, count, data } = this.props.notifications;

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
            {isNotificationsLoading && <NotificationSkeleton />}
            {!isNotificationsLoading && data.length === 0 && (
              <div style={{ marginTop: 20 }}>
                <NonIdealState
                  icon={IconNames.NOTIFICATIONS_UPDATED}
                  title="There is no notification ..."
                  description={
                    'Notifications will be generated automatically by the system in case of any opportunity.'
                  }
                />
              </div>
            )}
            {!isNotificationsLoading &&
              data.length > 0 &&
              data.map((notification) => (
                <Link
                  to={`/notification/${notification.id}/${notification.name}`}
                  className={'callout-item-link'}
                  key={notification.id}
                >
                  <NotificationItem notification={notification} key={notification.id} />
                </Link>
              ))}
            {!isNotificationsLoading && data.length > 11 && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => this.loadMore()}
                  loading={isInfinityLoading}
                  disabled={isDisableLoading}
                  icon={IconNames.DOUBLE_CHEVRON_DOWN}
                  style={{ marginTop: 10, marginBottom: 20 }}
                >
                  Show previous notifications
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
  auth: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  notificationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationsAction })(Notifications);
