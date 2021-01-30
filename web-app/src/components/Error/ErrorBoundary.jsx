import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Classes, Icon } from '@blueprintjs/core';
import { catchErrorLogAndReportIt } from '../../api/userAccount';
import BaseLayout from '../Layout/BaseLayout';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    catchErrorLogAndReportIt({
      time: Date.now(),
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
    })
      .then(() => {})
      .catch(() => {});
  }

  render() {
    if (this.state.hasError) {
      if (localStorage.getItem('userToken')) {
        return (
          <BaseLayout>
            <Grid fluid>
              <Row>
                <Col xs={12} mdOffset={3} md={6}>
                  <div style={{ margin: 20 }}>
                    <br />
                    <br />
                    <h1>Someting went wrong.</h1>
                    <h1>We are sorry for this happening.</h1>
                    <h2>Our development team will fill fix this problem soon.</h2>
                    <br />
                    <Link className={classnames(Classes.BUTTON)} to={'/'}>
                      <Icon icon={IconNames.HOME} />
                      <span>Go home</span>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Grid>
          </BaseLayout>
        );
      }

      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
