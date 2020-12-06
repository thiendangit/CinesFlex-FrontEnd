import * as React from 'react';
import {SafeAreaView, View, NativeModules, StatusBar, Platform} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '@library/components/MyTabBar';
import {memo} from "react";
import isEqual from "react-fast-compare";
import {Constants, dispatch, scale} from "@common";
import {onSetAppTab} from "@app_redux/reducer";
import {AppTab, tabItem} from "@config/type";
import {getUrlByTypeUser} from "@library/utils/getURLByTypeUser/getURLByTypeUser";
import SpinnerCustom from "@library/components/SpinnerCustom";
import {ColorsCustom} from "@theme/color";
import {AppState} from "@app_redux/type";
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";
import {ApiConstants} from "@networking";
import {UserProfileScreen} from "@features/authentication";
import {CinemasScreen, HomeScreen, LoginScreen, PromotionScreen, RegisterScreen} from "@features/unAuthentication";
import {APP_SCREEN} from "@navigation/screenTypes";

const {StatusBarManager} = NativeModules;

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CinemasStack = createStackNavigator();
const PromotionStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const homeOptions = {
    headerShown: false,
    headerMode: 'none',
};

interface IProps {
    // theme: ThemeNavigator
}

interface IState {
    loginReducer: {
        isLoggedIn: boolean
    };
    loadingReducer: {
        isLoginLoading: boolean
    },
    app: AppState
}

const AuthNavigator = () => {

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    return (
        <AuthStack.Navigator>
            {token && <Stack.Screen
                name={APP_SCREEN.USER_PROFILE}
                component={UserProfileScreen}
                options={homeOptions}
            />}
            <Stack.Screen
                name={APP_SCREEN.LOGIN}
                component={LoginScreen}
                options={homeOptions}
            />
            <Stack.Screen
                name={APP_SCREEN.REGISTER}
                component={RegisterScreen}
                options={homeOptions}
            />
            <Stack.Screen
                name="ForgotPasswordScreen"
                component={LoginScreen}
                options={homeOptions}
            />
        </AuthStack.Navigator>
    );
};

const HomeNavigator = ({navigation, route}: any) => {
    return (
        <HomeStack.Navigator>
            <Stack.Screen name={APP_SCREEN.HOME} component={HomeScreen} options={homeOptions}/>
        </HomeStack.Navigator>
    )
};

const CinemasNavigator = () => (
    <CinemasStack.Navigator>
        <Stack.Screen name={APP_SCREEN.CINEMAS} component={CinemasScreen} options={homeOptions}/>
    </CinemasStack.Navigator>
);

const PromotionNavigator = () => (
    <PromotionStack.Navigator>
        <Stack.Screen name={APP_SCREEN.PROMOTION} component={PromotionScreen} options={homeOptions}/>
    </PromotionStack.Navigator>
);


const NavigationTab: React.FC<IProps> = (props: IProps) => {
        const userType = useSelector(
            (state: IState) => state?.app?.profile?.user_type
        );
        const [showSpinner, setShowSpinner] = useState<boolean>(true);
        const [statusBarHeight, setStatusBarHeight] = useState<number>(20);

        const loading = useSelector(
            (state: IState) => state?.app?.loading
        );

        let typeURL = getUrlByTypeUser(userType);

        const URL_DOMAIN = useSelector(
            (state: IState) => state?.app?.appUrl
        );

        let color = userType === Constants.ROLE.SUPPLIER ? ColorsCustom.lime_green : ColorsCustom.light_red;

        useEffect(() => {
            if (loading) {
                setShowSpinner(true)
            } else {
                setShowSpinner(false)
            }
        }, [loading]);

        useEffect(() => {
            if (Platform.OS === 'ios') {
                StatusBarManager.getHeight((response: { height: any }) => setStatusBarHeight(response.height));
            }
        }, []);

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                    <Tab.Navigator
                        tabBarPosition='bottom'
                        initialRouteName="Home"
                        tabBar={(props: any) => <MyTabBar {...props}/>}
                    >
                        <Tab.Screen
                            options={{
                                tabBarLabel: 'home',
                            }} name="Home" component={HomeNavigator}/>
                        <Tab.Screen
                            options={{
                                tabBarLabel: 'Cinemas',
                            }}
                            name="Cinemas" component={CinemasNavigator}/>
                        <Tab.Screen
                            options={{
                                tabBarLabel: 'Promotion',
                            }}
                            name="Promotion" component={PromotionNavigator}/>
                        <Tab.Screen
                            options={{
                                tabBarLabel: 'UserProfile',
                            }}
                            name="UserProfile" component={AuthNavigator}/>
                    </Tab.Navigator>
                    {showSpinner ? <SpinnerCustom fullStretch size={scale(40)} color={color}/> : null}
            </View>
        );
    }
;
export default memo(NavigationTab, isEqual);
