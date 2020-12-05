import * as React from 'react';
import {NativeModules, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {HeaderProps} from './Header.props';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {Icon} from '../Icon/Icon';
import {Block} from '../Block/Block';
import {enhance, verticalScale} from '@common';
import equals from 'react-fast-compare';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SpacingDefault} from '@theme/spacing';
import {useState} from "react";
import {useEffect} from "react";
import {ColorsCustom} from "@theme/color";

const {StatusBarManager} = NativeModules;

const styles = () => {
    const inset = useSafeArea();
    return React.useMemo(
        () =>
            StyleSheet.create({
                ROOT: {
                    flexDirection: 'row',
                    paddingHorizontal: SpacingDefault.tiny,
                    alignItems: 'center',
                    height: 50,
                    justifyContent: 'center',
                },
                TITLE: {
                    textAlign: 'center',
                },
                TITLE_MIDDLE: {
                    flex: 1,
                    justifyContent: 'center',

                },
                LEFT: {
                    width: 32,
                },
                RIGHT: {
                    width: 32,
                },
                WRAP_ICON: {
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                },
            }),
        [inset],
    );
};

const HeaderComponent: React.FunctionComponent<HeaderProps> = props => {
    const {
        onLeftPress,
        onRightPress,
        rightIcon,
        leftIcon,
        headerText,
        headerTx,
        style = {},
        titleStyle = {},
        childrenLeft,
        childrenRight,
        styleLeft = {},
        styleRight = {},
    } = props;
    const [t] = useTranslation();
    const header = headerText || (headerTx && t(headerTx)) || '';

    const wrapStyle = enhance([styles().ROOT, style]);
    const title = enhance([styles().TITLE, titleStyle]);
    const LEFT = enhance([styles().WRAP_ICON, styleLeft]);
    const RIGHT = enhance([styles().WRAP_ICON, styleRight]);
    const viewLeft = styles().LEFT;
    const viewMiddle = styles().TITLE_MIDDLE;
    const viewRight = styles().RIGHT;

    const [statusBarHeight, setStatusBarHeight] = useState<number>(20);
    useEffect(() => {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((response: { height: any }) => setStatusBarHeight(response.height));
        }
    }, []);
    return (
        <Block>
            <View style={[{height: statusBarHeight, backgroundColor: ColorsCustom.lime_green}]}>
                <StatusBar translucent
                           barStyle="light-content"/>
            </View>
            <Block style={wrapStyle}>
                {leftIcon ? (
                    <Button style={LEFT} preset="link" onPress={onLeftPress}>
                        <Icon icon={leftIcon}/>
                    </Button>
                ) : childrenLeft ? (
                    {childrenLeft}
                ) : (
                    <Block style={viewLeft}/>
                )}
                <Block style={viewMiddle}>
                    <Text style={title} text={header}/>
                </Block>
                {rightIcon ? (
                    <Button style={RIGHT} preset="link" onPress={onRightPress}>
                        <Icon icon={rightIcon}/>
                    </Button>
                ) : childrenRight ? (
                    {childrenRight}
                ) : (
                    <Block style={viewRight}/>
                )}
            </Block>
        </Block>
    );
};
export const Header = React.memo(HeaderComponent, equals);
