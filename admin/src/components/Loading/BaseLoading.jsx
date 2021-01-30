import React from 'react';
import Loading from './Loading';

function BaseLoading({ error }) {
  if (error) {
    return 'Please contact with site admin!';
  } else {
    return <Loading type="small" />;
  }
}

export default BaseLoading;
