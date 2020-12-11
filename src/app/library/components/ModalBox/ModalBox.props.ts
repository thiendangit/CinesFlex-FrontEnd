import {ViewStyle, StyleProp} from 'react-native';
import React from 'react';

export interface OptionData {
    /**
     * (Required) Text to display
     */
    text: string;

    /**
     * Param pass to the call back function
     */
    itemCallback?: any;
}

export interface ModalBoxProps {
    /**
     * Background press function
     * @default undefined
     */
    onBackDropPress?: Function;

    /**
     * Enable to click backdrop to close
     * @default true
     */
    closeOnBackDrop?: boolean;

    /**
     * Overwrite style for action sheet
     * @default undefined
     */
    rootStyle?: StyleProp<ViewStyle>;

    /**
     * Color of backdrop when open
     * @default rgba(0,0,0,.5)
     */
    backDropColor?: string;

    /**
     * Children for Block
     * @default undefined
     */
    children?: React.ReactNode;

}
