import {ViewStyle, StyleProp} from 'react-native';
import React from 'react';
import {CardType} from "@library/components/CardAnimation/Card";

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

export interface CardAnimationProps {
    /**
     * Overwrite style for action sheet
     * @default undefined
     */
    rootStyle?: StyleProp<ViewStyle>;
    /**
     * Children for Block
     * @default undefined
     */
    children?: React.ReactNode;
    /**
     * handle onPress Card
     */
    onPressCard: (item: CardType, index: number) => void;

    /**
     * handle onPress Card
     */
    cards: CardType[]
}
