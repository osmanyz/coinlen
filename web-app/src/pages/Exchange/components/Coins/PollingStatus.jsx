import React from 'react';
import PropTypes from 'prop-types';
import { Callout, Classes, Icon, Spinner, Position, Tooltip } from '@blueprintjs/core';

const PollingStatus = (props) => (
  <React.Fragment>
    {props.isStopBoradcast && (
      <Callout className={Classes.TEXT_MUTED}>
        <span style={{ float: 'left', marginRight: 15 }}>
          <Spinner size={Spinner.SIZE_SMALL} tagName="span" />
        </span>
        <span title="This alert is based on your computer's time and provides control with the server time">
        Slowing down was detected in the data stream. If you think the process is taking a long time; 
        You can refresh the page, check your connection or wait for the system to restart automatically.{' '}
        </span>
        <Tooltip
          position={Position.BOTTOM}
          content="This alert is based on your computer's time and provides control with the server time."
        >
          <Icon icon="help" />
        </Tooltip>
      </Callout>
    )}
  </React.Fragment>
);

PollingStatus.propTypes = {
  isStopBoradcast: PropTypes.bool,
};

export default PollingStatus;
