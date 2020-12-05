import React, {memo, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import isEqual from 'react-fast-compare';
import {Form, Img, Text, Button, Block} from '@components';
import {ValidationMap} from '@library/components/Form/Form.props';
import {useForm} from 'react-hook-form';
import {Input} from '../Input';
import {onCheckType, verticalScale} from '@common';
import {styles} from "@features/unAuthentication/login/design/components/FormLogin/style";
import {images} from "@assets/image";
import {useTranslation} from "react-i18next";
import {ErrorMessage} from '@hookform/error-message';

export type FormValueLogin = {
    email: string;
    password: string;
};

interface FormLoginProps {
    activeTintBorderColor: string,
    onSubmit: (data: FormValueLogin) => void;
    onForgotPassword: () => void;
}

const FormLoginComponent = ({onSubmit, activeTintBorderColor, onForgotPassword}: FormLoginProps) => {
    const {
        register,
        setValue,
        trigger,
        getValues,
        errors,
        handleSubmit,
    } = useForm<FormValueLogin>({});
    const [t] = useTranslation()

    const [showPassword, setShowPassword] = useState(true);

    const rules = useMemo(
        () =>
            ({
                email: {
                    required: {value: true, message: 'Email is required'},
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    },
                },
                password: {
                    required: {value: true, message: 'Password is required'},
                    validate: (val: any) => onCheckType(getValues().password, 'undefined') || val != ''
                },
            } as ValidationMap<FormValueLogin>),
        [],
    );

    console.log({handleSubmit});

    const onSubmitKey = () => {
        handleSubmit(onSubmit)();
    };

    const onForgotKey = () => {
        onForgotPassword();
    };

    const onPressEyeButton = () => {
        setShowPassword(!showPassword)
    };

    return (
        <Form {...{register, setValue, trigger, rules, errors}}>
            <Input
                containerStyle={[styles().textInputContainer, {marginTop: verticalScale(10)}]}
                name={'email'} label={'Email'}
                nameTrigger={'email'}
                activeTintBorderColor={activeTintBorderColor}
            />
            <ErrorMessage
                errors={errors}
                name="email"
                render={({message}) =>
                    <Text style={styles().textError}>{message}</Text>}
            />
            <Input
                containerStyle={[styles().textInputContainer, {marginTop: verticalScale(20)}]}
                onSubmit={onSubmitKey}
                name={'password'}
                label={'Password'}
                nameTrigger={'password'}
                secureTextEntry={showPassword}
                activeTintBorderColor={activeTintBorderColor}
                rightChildren={() => {
                    return (
                        <TouchableOpacity onPress={onPressEyeButton}>
                            <Img style={styles().imageContainer}
                                 source={showPassword ? images.eye_off : images.eye_on}
                                 resizeMode={"contain"}/>
                        </TouchableOpacity>
                    )
                }}
            />
            <ErrorMessage
                errors={errors}
                name="password"
                render={({message}) =>
                    <Text style={styles().textError}>{message}</Text>}
            />
            <TouchableOpacity onPress={onForgotKey} style={[styles().buttonForgotPassword]}>
                <Text style={styles().textForgotPassword}>
                    {t('user:forgot_your_password')}
                </Text>
            </TouchableOpacity>
            <Button onPress={handleSubmit(onSubmit)}
                    style={[styles().buttonLogin, {backgroundColor: activeTintBorderColor}]}>
                <Text style={styles().textButton}>
                    {t('common:login')}
                </Text>
            </Button>
        </Form>
    );
};

export const FormLogin = memo(FormLoginComponent, isEqual);


