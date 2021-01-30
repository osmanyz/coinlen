import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Classes, Callout, Icon } from '@blueprintjs/core';

class Completed extends React.Component {
  componentDidMount() {
    document.title = 'Successful Payment | Coinlen';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <div style={{ margin: 20 }}>
              <h1>
                <span style={{ color: 'green' }}>Congratulations!</span> Your payment has been received successfully.
              </h1>
              <Callout>
                <p>You can now benefit from the privileges of being Premium. Hope you enjoy your membership.</p>
              </Callout>
              <br />
              <Link className={classnames(Classes.BUTTON)} to={'/'}>
                <Icon icon={IconNames.FAST_BACKWARD} />
                <span>Live Exchanges</span>
              </Link>
              <br />
              <br />
              <small className={Classes.TEXT_MUTED}>
                This page is for informational purposes only. If you visited by mistake, please ignore the above
                message.
              </small>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Completed;
