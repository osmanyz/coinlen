import React from 'react';
import { Link } from 'react-router-dom';
import { Callout, H5 } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default function Home() {
  React.useEffect(() => {
    document.title = 'Dashboard | Coinlen';
  }, []);

  return (
    <Grid>
      <Row>
        <Col xs={12} mdOffset={3} md={6}>
          <div style={{ marginTop: 10 }}>
            <h3>Exchanges</h3>
            <Link to={'/first-exchange'} className="callout-item-link" style={{ marginBottom: 20, display: 'block' }}>
              <Callout>
                <H5>Go to Paribu Exchange</H5>
              </Callout>
            </Link>
            <Link to={'/second-exchange'} className="callout-item-link">
              <Callout>
                <H5>Go to BtcTurk Exchange</H5>
              </Callout>
            </Link>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}
