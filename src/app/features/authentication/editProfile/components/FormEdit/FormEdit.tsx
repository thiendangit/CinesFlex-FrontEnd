import React, {memo, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import isEqual from 'react-fast-compare';
import {Form, Img, Text, Button, Block} from '@components';
import {ValidationMap} from '@library/components/Form/Form.props';
import {useForm} from 'react-hook-form';
import {onCheckType, verticalScale} from '@common';
import {styles} from "@features/unAuthentication/login/design/components/FormLogin/style";
import {images} from "@assets/image";
import {useTranslation} from "react-i18next";
import {ErrorMessage} from '@hookform/error-message';
import {deviceWidth} from "@utils";
import {useValue} from "react-native-reanimated";
import {Input} from "@features/unAuthentication/login/design/components/Input";
import validator from "validator"
import {useSelector} from "react-redux";
import {AppState} from "@app_redux/type";

export type FormValueEditPage = {
    email: string;
    password: string;
    phone: number,
    name: string,
    confirmPassword: string;
};

interface FormEditProps {
    activeTintBorderColor: string,
    onSubmit: (data: FormValueEditPage) => void;
    onForgotPassword: () => void;
}

interface OptionPageProps {
    name: string,
    label: string,
    nameTrigger: string,
    containerStyle: any,
}

const FormEditComponent = React.forwardRef(({onSubmit, activeTintBorderColor}: FormEditProps, ref: any) => {

    const {
        register: register,
        setValue: setValue,
        trigger: trigger,
        getValues: getValues,
        errors: errors,
        handleSubmit: handleSubmitPage,
    } = useForm<FormValueEditPage>({});

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
            } as ValidationMap<FormValueEditPage>),
        [],
    );

    const onSubmitPage = (data: FormValueEditPage) => {
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
                        name={'name'} label={'Name'}
                        nameTrigger={'name'}
                        activeTintBorderColor={activeTintBorderColor}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
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
                        containerStyle={[styles().textInputContainer, {marginTop: verticalScale(10)}]}
                        name={'phone'} label={'Phone'}
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
                </Form>
                <Button onPress={handleOnPressSubmit}
                        style={[styles().buttonLogin, {backgroundColor: activeTintBorderColor}]}>
                    <Text style={styles().textButton}>
                        {t('common:Save')}
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

export const FormEdit = memo(FormEditComponent, isEqual);



