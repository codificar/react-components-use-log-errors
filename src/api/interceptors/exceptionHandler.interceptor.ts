import VersionNumber from 'react-native-version-number';
import { Platform } from 'react-native';
import axios from 'axios';

const params = `?version_code= Version_code${VersionNumber.appVersion} |&version_os=OS: ${Platform.OS}-${Platform.Version} |&error=`;
const logError = `/api/lib/rn-log-error${params}`;

export type ExceptionHandlerProps = {
  baseUrl: string;
  projectName?: string;
  appType: 'user' | 'provider';
  error: any;
  errorInfo: any;
};

export const handleException = async (
  data: ExceptionHandlerProps
): Promise<void> => {
  const { baseUrl, projectName, appType, error, errorInfo } = data;
  const infoError = JSON.stringify(errorInfo);
  const headers = {
    'Content-Type': 'application/json',
  };

  const errorReport = String(error) + ' ' + error.stack;

  const url = `${baseUrl}${logError}${errorReport}${infoError}&app=${projectName || ""} |AppType: ${appType} |&origin=${error} - `;

  await axios.get(url, { headers });
};
