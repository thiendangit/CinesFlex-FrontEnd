import { ThemeType } from '@theme';
import { AppModeType } from '@networking';
import {AppTab} from "@config/type";

export interface AppState {
  internetState: boolean;

  profile: any;

  token: any | undefined | null;

  loading: boolean;

  showDialog: boolean;

  theme: ThemeType;

  appMode: AppModeType;

  appUrl: string;

  appTab : AppTab
}
