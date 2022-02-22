# use-log-errors

A new lib to handle errors in react native apps.

## Installation

add in package.json:

```bash
"@codificar/use-log-errors": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/use-log-errors.git",
```

execute the command:

```sh
yarn
```

<img src="./github/demo.png" />

## Basic Usage

Import the `ErrorBoundary` and wrap it over the main application container as a context provider.

```ts
// apps with old architecture JS
// file: App/Containers/App.js
import { ErrorBoundary } from '@codificar/use-log-errors';

// ...

const App : React.FC () => {
  //...

  return (
    <ErrorBoundary appType="user" baseUrl={constants.BASE_URL}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          // ...
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
```

```ts
// apps with others architectures
// file: Look for your application's main file.
// Usually the name is App.ts or index.ts
import { ErrorBoundary } from '@codificar/use-log-errors';

// ...

const App : React.FC () => {
  //...

  return (
    <ErrorBoundary appType="user" baseUrl={BASE_URL}>
     <Provider rootStore={store}>
        <ThemeProvider theme={theme}>
          <Navigation
            setNavigationTop={(navigatorRef: NavigationContainerRef): void =>
              NavigationActions.setTopLevelNavigator(navigatorRef)
            }
          />
          <ToastMessage position="top" />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
```

### Props & Types

```ts
type Options = {
  message: string;
  buttonTitle: string;
  buttonColor: string;
  textButtonColor: string;
};

const defaultOptions: Options = {
  message: 'Parece que um erro aconteceu, volte atrás e tente novamente.',
  buttonTitle: 'Voltar',
  buttoncolor: 'grey',
  textButtonColor: 'white',
};
```

| Prop    |    Default     |       Type        | isRequired | Description                       |
| :------ | :------------: | :---------------: | :--------: | --------------------------------- |
| appType |       -        | `user`/`provider` |     ✔️     | app type must be specified in log |
| baseUrl |       -        |     `string`      |     ✔️     | base_url to send error log        |
| options | defaultOptions |     `Options`     |  optional  | Custom options for ErrorComponent |

## Interceptors

To log api errors, import the `sendLogError` interceptor.

```ts
// to use globally, apply on interceptor.

import { sendLogError } from '@codificar/use-log-errors';
// ...
api.interceptors.response.use(successResponse, (error: AxiosError) => {
  const logErrorParams = {
    appType: 'user',
    baseUrl: BASE_URL,
    error,
  };
  sendLogError(logErrorParams);
});
```

```ts
// to use locally: apply on try catch.

import { sendLogError } from '@codificar/use-log-errors';
// ...
const getExemple = () => {
  try {
    // ..
    await api.getSomeThing();
  } catch (error) {
    sendLogError(error);
  }
};
```
