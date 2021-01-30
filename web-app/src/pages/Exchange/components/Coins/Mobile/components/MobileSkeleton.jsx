import React from 'react';
import classnames from 'classnames';
import { Classes } from '@blueprintjs/core';

const MobileSkeleton = () => (
  <React.Fragment>
    <div className="mobile-coin-card first skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
    <div className="mobile-coin-card skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-symbol-skeleton')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-name')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
      <span className={classnames(Classes.SKELETON, 'mobile-skeleton-info')} tabIndex="-1" />
    </div>
  </React.Fragment>
);

export default MobileSkeleton;
