import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { IconNames } from '@blueprintjs/icons';
import { Callout, Classes, Icon, Intent, H4 } from '@blueprintjs/core';

function PremiumCard(props) {
  return (
    <React.Fragment>
      {!props.auth.user.premiumStatus && (
        <React.Fragment>
          <Callout className="callout-margin-top" icon={null} intent={Intent.DANGER}>
            <Icon
              icon={IconNames.SHIELD}
              iconSize={Icon.SIZE_LARGE}
              intent={Intent.DANGER}
              className="profile-premium-icon"
            />
            <div className="profile-premium-text">
              <H4>Trial Membership</H4>
              <span>
                <Moment fromNow date={props.auth.user.premiumDate} style={{ marginRight: 3 }} />
                {props.auth.user.premiumDate < new Date() ? 'your membership is over.' : 'your membership is ending.'}
              </span>
            </div>
          </Callout>
          <Callout className="profile-premium-box callout-margin-top" icon={null} intent={Intent.PRIMARY}>
            <Icon
              icon={IconNames.CROWN}
              iconSize={Icon.SIZE_LARGE}
              intent={Intent.PRIMARY}
              className="profile-premium-icon"
            />
            <div className="profile-premium-text">
              <H4 className="be-premium">Become a Premium Member</H4>
              <span>
                Your trial membership will expire on <Moment date={props.auth.user.premiumDate} format="D MMMM YYYY HH:mm" />. <br />
                If you want to continue using Coinlen, be premium.
              </span>
            </div>
          </Callout>
        </React.Fragment>
      )}
      {props.auth.user.premiumStatus && (
        <Callout intent={Intent.WARNING} icon={null} className="profile-premium-box callout-margin-top">
          <Icon
            icon={IconNames.STAR}
            iconSize={Icon.SIZE_LARGE}
            intent={Intent.WARNING}
            className="profile-premium-icon"
          />
          <div className="profile-premium-text">
            <H4 className="be-premium">Premium Membership</H4>
            <span>
              End Date: <Moment date={props.auth.user.premiumDate} format="D MMMM YYYY HH:mm" />
              <Moment
                fromNow
                date={props.auth.user.premiumDate}
                style={{ marginLeft: 5 }}
                className={Classes.TEXT_MUTED}
              />
            </span>
          </div>
        </Callout>
      )}
    </React.Fragment>
  );
}

PremiumCard.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PremiumCard;
