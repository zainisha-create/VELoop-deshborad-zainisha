import React from 'react';
import styles from './StateViews.module.css';

export const ErrorView = ({
  title = "Unable to Load Level Progress",
  message = "We couldn't load your level information right now. Please check your network connection and try again.",
  onRetry
}) => {
  return (
    <div className={styles.stateCard} role="alert">
      <div className={styles.iconCircleError}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.errorIcon}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      {onRetry && (
        <button
          type="button"
          className={styles.retryButton}
          onClick={onRetry}
        >
          <span>Try Again</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.btnIcon}
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ErrorView;
