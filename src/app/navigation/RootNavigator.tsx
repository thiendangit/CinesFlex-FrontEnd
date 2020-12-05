import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import NavigationTab from '@navigation/NavigationTab/NavigationTab'
import {ColorsCustomType} from '@config/type';
import {ThemeType} from "@theme";

export const RootNavigation = memo(({token, theme}: { token: string, theme: ThemeType | ColorsCustomType }) => (
        < NavigationTab/>
), isEqual);
