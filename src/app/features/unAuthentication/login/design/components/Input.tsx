import React, {memo, forwardRef} from 'react';
import {Block, Form, Text, TextField} from '@components';
import isEqual from 'react-fast-compare';
import {FieldError} from 'react-hook-form';
import {ColorsCustom} from "@theme/color";
import {KeyboardType, StyleProp, ViewStyle} from "react-native";

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
    disabled?: boolean
    keyboardType?: KeyboardType,
    typeInput?: "flat" | "outline",
    defaultValue?: string
    onTextChange?: (name?: string, value?: string) => void;
}

const InputComponent = forwardRef<any, InputProps>(
    ({
         onSubmit, label, name, nameTrigger, error,
         disabledLabelColor, activeTintBorderColor, activeTintLabelColor,
         unActiveTintBorderColor, unActiveTintLabelColor, disabledBorderColor,
         containerStyle, rightChildren, secureTextEntry,
         typeInput, keyboardType, defaultValue,disabled, onTextChange, ...rest
     }, ref) => {
        return (
            <Block>
                <TextField
                    onSubmit={onSubmit}
                    ref={ref}
                    nameTrigger={nameTrigger}
                    error={error?.message !== undefined}
                    label={label}
                    disabled={disabled}
                    name={name}
                    onTextChange={onTextChange}
                    defaultValue={defaultValue}
                    disabledLabelColor={disabledLabelColor && disabledLabelColor || ColorsCustom.lightGrey}
                    activeTintBorderColor={activeTintBorderColor && activeTintBorderColor || ColorsCustom.lightGrey}
                    activeTintLabelColor={activeTintLabelColor && activeTintLabelColor || ColorsCustom.lightGrey}
                    unActiveTintBorderColor={unActiveTintBorderColor && unActiveTintBorderColor || ColorsCustom.lightGrey}
                    unActiveTintLabelColor={unActiveTintLabelColor && unActiveTintLabelColor || ColorsCustom.lightGrey}
                    disabledBorderColor={disabledBorderColor && disabledBorderColor || ColorsCustom.lightGrey}
                    typeInput={typeInput ?? 'flat'}
                    containerStyle={containerStyle}
                    rightChildren={rightChildren}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    {...rest}
                />
            </Block>
        );
    },
);

export const Input = memo(InputComponent, isEqual);
