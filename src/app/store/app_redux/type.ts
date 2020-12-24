import {ThemeType} from '@theme';
import {AppModeType} from '@networking';
import {AppTab, UserType} from "@config/type";

export interface AppState {
    internetState: boolean;

    profile: UserType

    token: any | undefined | null;

    loading: boolean;

    showDialog: boolean;

    theme: ThemeType;

    appMode: AppModeType;

    appUrl: string;

    appTab: AppTab
}
