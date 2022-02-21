/* eslint-disable no-shadow */
import React, { FC } from 'react';
import { handlerException } from '../../api';
import { useErrorBoundary } from 'use-error-boundary';
import ErrorScreen from './ErrorComponent';

export type Options = {
  message: string;
  buttonTitle: string;
  buttonColor: string;
  textButtonColor: string;
};

type Props = {
  children: JSX.Element | JSX.Element[];
  appType: 'user' | 'provider';
  baseUrl: string;
  screen?: string;
  options?: Options;
};

const ErrorBoundary: FC<Props> = ({ children, appType, baseUrl, options }) => {
  const { ErrorBoundary, reset } = useErrorBoundary({
    onDidCatch: (error: Error, errorInfo) => {
      handlerException({
        appType,
        baseUrl,
        error,
        errorInfo,
      })
        .then(() => console.log('success-log-send:', errorInfo))
        .catch((error) => console.log({ error }));
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
