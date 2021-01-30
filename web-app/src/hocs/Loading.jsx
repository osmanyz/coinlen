import React from 'react';
import { Spinner } from '@blueprintjs/core';
import WindowSizes from '../helpers/WindowSizes';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <Spinner size={WindowSizes().width < 768 ? 40 : Spinner.SIZE_STANDARD} />
      </div>
    </div>
  );
}

export default Loading;
