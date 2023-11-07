import Axios from 'axios';
import VersionNumber from 'react-native-version-number';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import {
  getTimeZone,
  usesAutoDateAndTime,
  usesAutoTimeZone,
} from 'react-native-localize';

export type ExceptionHandlerProps = {
  baseUrl: string;
  projectName: string;
  originError: any;
  error: any;
};

export const handlerException = async (
  data: ExceptionHandlerProps
): Promise<void> => {
  try {
    const localize: {
      timeZone: any;
      usesAutoDateAndTime: any;
      usesAutoTimeZone: any;
    } = {
      timeZone: getTimeZone(),
      usesAutoDateAndTime: usesAutoDateAndTime(),
      usesAutoTimeZone: usesAutoTimeZone(),
    };

    const connection: { type: any; details: any } = {
      type: '',
      details: '',
    };

    await NetInfo.fetch().then((state) => {
      connection.type = state.type;
      connection.details = state.details;
    });

    let info = JSON.stringify({ connection, localize });

    const params =
      `?version_code=${VersionNumber.appVersion}` /** Version Code APP */ +
      `&version_os=${Platform.OS}_${Platform.Version}` /** Version Android or iOS */ +
      `&error=${data.error}` /** Error */ +
      `&app=${data.projectName}` /** Project Name*/ +
      `&origin=${data.originError}` /** Origin Error*/ +
      `&info=${info}`; /** Infos connection and localize*/

    const appTypeUri = `/api/lib/rn-log-error${params}`;

    const headers = {
      'Content-Type': 'application/json',
    };
    const URL = `${data.baseUrl}` + `${appTypeUri}`;

    await Axios.get(URL, { headers });
  } catch (error) {
    console.error('handlerException: LIB', error);
  }
};
