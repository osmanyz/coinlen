import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { Classes, Icon, NonIdealState } from '@blueprintjs/core';

const PremiumControl = (props) => {
  const date = moment(props.auth.user.premiumDate).format('D MMMM YYYY HH:mm');
  return (
    <div style={{ marginTop: '4em' }}>
      <NonIdealState
        icon={IconNames.CLEAN}
        title="Premium Membership Required"
        description={`You cannot see the Live Exchange because your membership has ended on ${date}. If you want to continue follow the Live Exchange, you have to purchase the Premium membership.`}
        action={
          <Link to={'/payment'} className={classnames(Classes.BUTTON)}>
            <Icon icon={IconNames.STAR} />
            <span>Be Premium Now</span>
          </Link>
        }
      />
    </div>
  );
};

PremiumControl.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PremiumControl;
