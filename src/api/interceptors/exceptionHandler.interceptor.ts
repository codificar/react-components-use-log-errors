import VersionNumber from 'react-native-version-number';
import { Platform } from 'react-native';
import axios from 'axios';

const params = `?version_code= Version_code${VersionNumber.appVersion} |&version_os=OS: ${Platform.OS}-${Platform.Version} |&error=`;
const logError = `/api/lib/rn-log-error${params}`;

export type ExceptionHandlerProps = {
  baseUrl: string;
  appType: 'user' | 'provider';
  error: any;
  errorInfo: any;
};

export const handlerException = async (
  data: ExceptionHandlerProps
): Promise<void> => {
  const { baseUrl, appType, error, errorInfo } = data;
  const infoError = JSON.stringify(errorInfo);
  const headers = {
    'Content-Type': 'application/json',
  };
  const url = `${baseUrl}${logError}${infoError}&app=AppType: ${appType} |&origin=${error} - `;

  await axios.get(url, { headers });
};
