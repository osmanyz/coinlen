import React from 'react';
import classnames from 'classnames';
import { Callout, Classes } from '@blueprintjs/core';

const NotificationSkeleton = () => (
  <div style={{ marginTop: 20 }}>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
    <Callout className="mobile-skeleton-box skeleton">
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-right-sub-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-title')} tabIndex="-1" />
      <div className={classnames(Classes.SKELETON, 'mobile-skeleton-sub-title')} tabIndex="-1" />
    </Callout>
  </div>
);

export default NotificationSkeleton;
