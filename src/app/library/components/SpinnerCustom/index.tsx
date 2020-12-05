import React, {} from 'react';
import {View} from "react-native";
import styles from "@library/components/SpinnerCustom/styles";
import {ActivityIndicator} from "react-native-paper";
import {scale} from "@common";
import {ColorsCustom} from "@theme/color";

export declare type EvaSize = number | "small" | "large" | undefined

interface ISpinner {
    fullStretch: boolean;
    size: EvaSize,
    color?: string
}

const SpinnerCustom: React.FC<ISpinner> = (props): React.ReactElement => {
    return (
        <View style={props.fullStretch ? styles.fullStretch : styles.container}>
            <ActivityIndicator
                animating={true}
                color={props.color && props.color || ColorsCustom.light_red}
                size={props.size && props.size || scale(40)}
            />
        </View>
    );
};

export default SpinnerCustom;
