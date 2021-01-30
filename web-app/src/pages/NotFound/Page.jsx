import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Classes, Icon } from '@blueprintjs/core';

const Page = (props) => {
  if (!localStorage.getItem('userToken')) {
    props.history.push('/login');
  }

  React.useEffect(() => {
    document.title = '404 | Coinlen';
  }, []);

  return (
    <Grid fluid>
      <Row>
        <Col xs={12} mdOffset={3} md={6}>
          <div style={{ margin: 20 }}>
            <br />
            <br />
            <h1>Sorry, the page you are looking for is currently not available.</h1>
            <br />
            <Link className={classnames(Classes.BUTTON)} to={'/guidline'}>
              <Icon icon={IconNames.HOME} />
              <span>Dashboard</span>
            </Link>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default Page;
