import React, {memo, forwardRef, RefAttributes} from 'react';
import {Block, Form, Text, TextField} from '@components';
import isEqual from 'react-fast-compare';
import {FieldError} from 'react-hook-form';
import {ColorsCustom} from "@theme/color";
import {Animated, StyleProp, ViewStyle} from "react-native";
import {ErrorMessage} from "@hookform/error-message";
import {styles} from "@features/unAuthentication/register/components/FormRegister/style";

interface InputProps {
    name: string;
    label: string;
    error?: FieldError | undefined;
    onSubmit?: () => void;
    nameTrigger?: string;
    disabledLabelColor?: string,
    activeTintBorderColor?: string,
    activeTintLabelColor?: string,
    unActiveTintBorderColor?: string,
    unActiveTintLabelColor?: string,
    disabledBorderColor?: string,
    containerStyle?: StyleProp<ViewStyle>
    rightChildren?: () => any,
    secureTextEntry?: boolean,
    errors? : any,
    hide? : boolean
}

const InputComponent = forwardRef<any, InputProps>(
    ({
         onSubmit, label, name, nameTrigger, error,
         disabledLabelColor, activeTintBorderColor, activeTintLabelColor,
         unActiveTintBorderColor, unActiveTintLabelColor, disabledBorderColor,hide,
         containerStyle, rightChildren, secureTextEntry,errors,...rest
     }, ref) => {

        return (
            <Block style={hide && {height : 0 , width : 0}}>
                <TextField
                    onSubmit={onSubmit}
                    ref={ref}
                    nameTrigger={nameTrigger}
                    error={error?.message !== undefined}
                    label={label}
                    name={name}
                    disabledLabelColor={disabledLabelColor && disabledLabelColor || ColorsCustom.lightGrey}
                    activeTintBorderColor={activeTintBorderColor && activeTintBorderColor || ColorsCustom.lightGrey}
                    activeTintLabelColor={activeTintLabelColor && activeTintLabelColor || ColorsCustom.lightGrey}
                    unActiveTintBorderColor={unActiveTintBorderColor && unActiveTintBorderColor || ColorsCustom.lightGrey}
                    unActiveTintLabelColor={unActiveTintLabelColor && unActiveTintLabelColor || ColorsCustom.lightGrey}
                    disabledBorderColor={disabledBorderColor && disabledBorderColor || ColorsCustom.lightGrey}
                    typeInput={'flat'}
                    containerStyle={containerStyle}
                    rightChildren={rightChildren}
                    secureTextEntry={secureTextEntry}
                    {...rest}
                />
            </Block>
        );
    },
);

export const InputWithError = memo(InputComponent,isEqual);
