/* eslint-disable no-shadow */
import React, { FC } from 'react';
import { handleException } from '../../api';
import { useErrorBoundary } from 'use-error-boundary';
import ErrorScreen from './ErrorComponent';

export type Options = {
  message?: string;
  buttonTitle?: string;
  buttonColor?: string;
  textButtonColor?: string;
};

type Props = {
  children: JSX.Element | JSX.Element[];
  appType?: 'user' | 'provider';
  baseUrl?: string;
  screen?: string;
  customHandler?(error: any, errorInfo: any): Promise<void>;
  options?: Options;
};

const ErrorBoundary: FC<Props> = ({
  children,
  appType = 'user',
  baseUrl = '',
  options,
  customHandler,
}) => {
  const { ErrorBoundary, reset } = useErrorBoundary({
    onDidCatch: (error: Error, errorInfo) => {
      if (customHandler !== undefined) {
        customHandler(error, errorInfo)
          .then(() => console.log('success-log-send'))
          .catch((error) => console.log({ error }));
      } else {
        handleException({
          appType,
          baseUrl,
          error,
          errorInfo,
        })
          .then(() => console.log('success-log-send'))
          .catch((error) => console.log({ error }));
      }
    },
  });

  return (
    <ErrorBoundary
      renderError={() => <ErrorScreen options={options} reset={reset} />}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
