import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Classes, Icon, Callout } from '@blueprintjs/core';

class Cancel extends React.Component {
  constructor(props) {
    super(props);

    this.headTitle = document.title;
  }

  componentDidMount() {
    document.title = 'Payment has been failed! | Coinlen';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <div style={{ margin: 20 }}>
              <h1>
                <span style={{ color: 'red' }}> Error!</span> Payment has been failed.
              </h1>
              <Callout>
                <p>Your payment may not be completed for the following reasons;</p>
                <ul>
                  <li>The operation may have timed out.</li>
                  <li>The transaction may have been manually canceled by you.</li>
                  <li>The payment may not have been sent to the correct address.</li>
                  <li>Your transactions in the relevant coin network have been blocked due to trying to make payments to the same address over and over.</li>
                </ul>
              </Callout>
              <br />
              <Link className={classnames(Classes.BUTTON)} to={'/payment'}>
                <Icon icon={IconNames.FAST_BACKWARD} />
                <span>Back to the payment</span>
              </Link>
              <br />
              <br />
              <small className={Classes.TEXT_MUTED}>
                This page is for informational purposes only. If you visited by mistake, please ignore the above message.
              </small>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Cancel;
