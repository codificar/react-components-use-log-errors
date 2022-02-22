import VersionNumber from 'react-native-version-number';
import { Platform } from 'react-native';
import axios from 'axios';

const params = `?version_code= Version_code${VersionNumber.appVersion} |&version_os=OS: ${Platform.OS}-${Platform.Version} |&error=`;
const logError = `/api/lib/rn-log-error${params}`;

export type SendLogErrorProps = {
  baseUrl: string;
  appType: 'user' | 'provider';
  error: any;
};

export const sendLogError = async (data: SendLogErrorProps): Promise<void> => {
  const { baseUrl, appType, error } = data;
  const infoError = JSON.stringify(error);
  const headers = {
    'Content-Type': 'application/json',
  };
  const url = `${baseUrl}${logError}${infoError}&app=AppType: ${appType} |&origin=Api_Error - `;

  await axios.get(url, { headers });
};
