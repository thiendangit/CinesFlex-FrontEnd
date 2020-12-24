import React, {ForwardedRef, memo, RefAttributes, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import isEqual from 'react-fast-compare';
import {Form, Img, Text, Button, Block, DropDown} from '@components';
import {ValidationMap} from '@library/components/Form/Form.props';
import {useForm} from 'react-hook-form';
import {Constants, dispatch, isNumber, onCheckType, scale, verticalScale} from '@common';
import {styles} from "@features/unAuthentication/login/design/components/FormLogin/style";
import {images} from "@assets/image";
import {useTranslation} from "react-i18next";
import {ErrorMessage} from '@hookform/error-message';
import {deviceWidth} from "@utils";
import {useValue} from "react-native-reanimated";
import {Input} from "@features/unAuthentication/login/design/components/Input";
import isMobilePhoneFunc from 'validator/lib/isMobilePhone';
import validator from "validator"
import {ColorsCustom} from "@theme/color";
import {useSelector} from "react-redux";
import {AppState} from "@app_redux/type";
import {ApiConstants} from "@networking";
import {actionsRegister} from "@features/unAuthentication/register/redux/reducer";

export type FormValueLoginPage = {
    email: string;
    password: string;
    phone: number,
    confirmPassword: string;
};

interface FormLoginProps {
    activeTintBorderColor: string,
    onSubmit: (data: FormValueLoginPage) => void;
    onForgotPassword: () => void;
}

interface OptionPageProps {
    name: string,
    label: string,
    nameTrigger: string,
    containerStyle: any,
}

const FormLoginComponent = React.forwardRef(({onSubmit, activeTintBorderColor}: FormLoginProps, ref: any) => {

    const {
        register: register,
        setValue: setValue,
        trigger: trigger,
        getValues: getValues,
        errors: errors,
        handleSubmit: handleSubmitPage,
    } = useForm<FormValueLoginPage>({});

    const [t] = useTranslation();
    const x = useValue(0);
    const [showPassword, setShowPassword] = useState(true);
    const [addressError, setAddressError] = useState<any>(false);
    const [dataPage1, setDataPage1] = useState({});
    const scrollRef = useRef<any>(null);
    const onScroll = (event: any) => {
        // console.log(event.nativeEvent.contentOffset.x)
    };
    const URL_DOMAIN = useSelector(
        (state: { app: AppState }) => state?.app?.appUrl
    );

    const customRuleString = (name: string, minLength = 2, maxLength = 50, validate?: (val: any) => any) => {
        return {
            required: {value: true, message: `The ${name.toLowerCase()} field is required.`},
            minLength: {
                value: minLength,
                message: `Please enter ${name.toLowerCase()} more than ${minLength} characters`
            },
            maxLength: {
                value: maxLength,
                message: `Please enter ${name.toLowerCase()} less than ${maxLength} characters`
            },
            validate: validate ?? {}
        }
    };

    const customRuleNumber = (name: string, minLength = 2, maxLength = 50) => {
        return {
            required: {value: true, message: `The ${name.toLowerCase()} field is required.`},
            minLength: {
                value: minLength,
                message: `Please enter ${name.toLowerCase()} more than ${minLength} characters`
            },
            validate: (val: any) => {
                if (!validator.isNumeric(val)) {
                    return `The ${name.toLowerCase()} field must be number.`
                }
            }
        }
    };

    const customRulePhone = (name: string, minLength = 2, maxLength = 20) => {
        return {
            required: {value: true, message: `The ${name.toLowerCase()} field is required.`},
            minLength: {
                value: minLength,
                message: `Please enter ${name.toLowerCase()} more than ${minLength} characters`
            },
            maxLength: {
                value: maxLength,
                message: `Please enter ${name.toLowerCase()} less than ${maxLength} characters`
            }
        }
    };

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
                phone: customRulePhone('Name'),
                password: customRuleString('Password', 6, 30),
                confirmPassword: customRuleString('Password', 6, 30, (val: any) =>
                    onCheckType(getValues().password, 'undefined') ||
                    onCheckType(getValues().confirmPassword, 'undefined') ||
                    val === getValues().password ||
                    'Passwords do not match')
            } as ValidationMap<FormValueLoginPage>),
        [],
    );

    const onSubmitPage = (data: FormValueLoginPage) => {
        let flag = true;
        for (let i in data) {
            // @ts-ignore
            if (data[i] === undefined || data[i] === "") {
                flag = false
            }
        }
        if (flag) {
            let result: any = {...dataPage1, ...data};
            onSubmit(result)
        }
    };

    const handleOnPressSubmit = () => {
        handleSubmitPage(onSubmitPage)();
    };

    const onPressEyeButton = () => {
        setShowPassword(!showPassword)
    };


    const _page1 = () => {
        return (
            <Block block style={{width: deviceWidth}}>
                <Form {...{
                    register: register,
                    setValue: setValue,
                    trigger: trigger,
                    rules: rules,
                    errors: errors
                }}>
                    <Input
                        containerStyle={[styles().textInputContainer, {marginTop: verticalScale(10)}]}
                        name={'phone'} label={'Name'}
                        nameTrigger={'phone'}
                        keyboardType={'numeric'}
                        activeTintBorderColor={activeTintBorderColor}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="phone"
                        render={({message}) =>
                            <Text style={styles().textError}>{message}</Text>}
                    />
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
                        onSubmit={handleOnPressSubmit}
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
                    <Input
                        containerStyle={[styles().textInputContainer, {marginTop: verticalScale(20)}]}
                        onSubmit={handleOnPressSubmit}
                        name={'confirmPassword'}
                        label={'Confirm Password'}
                        nameTrigger={'confirmPassword'}
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
                        name="confirmPassword"
                        render={({message}) =>
                            <Text style={styles().textError}>{message}</Text>}
                    />
                </Form>
                <Button onPress={handleOnPressSubmit}
                        style={[styles().buttonLogin, {backgroundColor: activeTintBorderColor}]}>
                    <Text style={styles().textButton}>
                        {t('common:register')}
                    </Text>
                </Button>
            </Block>
        )
    };

    return (
        <Animated.ScrollView
            horizontal
            snapToInterval={deviceWidth}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEnabled={false}
            style={{flex: 1}}
            scrollEventThrottle={1}
            ref={ref}
            {...{onScroll}}
        >
            {_page1()}
        </Animated.ScrollView>
    )
});

export const FormRegister = memo(FormLoginComponent, isEqual);



