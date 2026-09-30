import React from 'react';
import styles from './Skeleton.module.css';

export const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  variant = 'rect', // 'rect' | 'circle' | 'text'
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{
        width,
        height,
        borderRadius: variant === 'circle' ? '50%' : borderRadius,
        ...style
      }}
      aria-hidden="true"
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className={styles.dashboardSkeleton} aria-label="Loading dashboard...">
      {/* Top Boost row skeleton */}
      <div className={styles.row}>
        <Skeleton height="150px" borderRadius="20px" />
      </div>

      <div className={styles.statsRow}>
        <Skeleton height="90px" borderRadius="14px" />
        <Skeleton height="90px" borderRadius="14px" />
        <Skeleton height="90px" borderRadius="14px" />
      </div>

      <div className={styles.gridTwoCol}>
        <Skeleton height="260px" borderRadius="20px" />
        <Skeleton height="260px" borderRadius="20px" />
      </div>

      <Skeleton height="130px" borderRadius="20px" />

      <div className={styles.gridTwoCol}>
        <Skeleton height="280px" borderRadius="20px" />
        <Skeleton height="280px" borderRadius="20px" />
      </div>
    </div>
  );
};

export default Skeleton;
