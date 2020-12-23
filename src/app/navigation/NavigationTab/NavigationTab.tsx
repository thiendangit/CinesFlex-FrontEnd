import * as React from 'react';
import {View, NativeModules, Platform} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '@library/components/MyTabBar';
import {memo} from "react";
import isEqual from "react-fast-compare";
import {Constants, scale} from "@common";
import SpinnerCustom from "@library/components/SpinnerCustom";
import {ColorsCustom} from "@theme/color";
import {AppState} from "@app_redux/type";
import {
    BookTicketResultScreen,
    BookTicketScreen, CurrentSeeListScreen, FavoriteListScreen,
    OrderHistoryScreen,
    UserProfileScreen
} from "@features/authentication";
import {
    CinemasDetailsScreen,
    CinemasScreen,
    FilmDetailsScreen,
    HomeScreen,
    LoginScreen, PromotionDetailsScreen,
    PromotionScreen,
    RegisterScreen
} from "@features/unAuthentication";
import {APP_SCREEN} from "@navigation/screenTypes";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

const {StatusBarManager} = NativeModules;

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createSharedElementStackNavigator();
const CinemasStack = createStackNavigator();
const PromotionStack = createSharedElementStackNavigator();
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

const HomeNavigator = ({navigation, route}: any) => {
    return (
        <HomeStack.Navigator initialRouteName={APP_SCREEN.HOME} headerMode={'none'} mode={'modal'}>
            <HomeStack.Screen name={APP_SCREEN.HOME} component={HomeScreen} options={homeOptions}/>
            <HomeStack.Screen name={APP_SCREEN.FILM_DETAILS} component={FilmDetailsScreen} options={homeOptions}/>
            <HomeStack.Screen name={APP_SCREEN.CINEMAS} component={CinemasScreen} options={homeOptions}/>
            <HomeStack.Screen name={APP_SCREEN.CINEMAS_DETAILS} component={CinemasDetailsScreen} options={homeOptions}/>
            <HomeStack.Screen name={APP_SCREEN.BOOK_TICKET} component={BookTicketScreen} options={homeOptions}/>
            <HomeStack.Screen name={APP_SCREEN.BOOK_TICKET_RESULT} component={BookTicketResultScreen} options={homeOptions}/>
        </HomeStack.Navigator>
    )
};

const CinemasNavigator = () => (
    <CinemasStack.Navigator>
        <Stack.Screen name={APP_SCREEN.CINEMAS} component={CinemasScreen} options={homeOptions}/>
        <Stack.Screen name={APP_SCREEN.CINEMAS_DETAILS} component={CinemasDetailsScreen} options={homeOptions}/>
    </CinemasStack.Navigator>
);

const PromotionNavigator = () => (
    <PromotionStack.Navigator initialRouteName={APP_SCREEN.PROMOTION} headerMode={'none'} mode={'modal'}>
        <PromotionStack.Screen name={APP_SCREEN.PROMOTION} component={PromotionScreen}/>
        <PromotionStack.Screen name={APP_SCREEN.PROMOTION_DETAILS} component={PromotionDetailsScreen}/>
    </PromotionStack.Navigator>
);

const AuthNavigator = () => {

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    return (
        <AuthStack.Navigator>
            {<Stack.Screen
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
                name={APP_SCREEN.FORGOT_PASSWORD}
                component={LoginScreen}
                options={homeOptions}
            />
            <Stack.Screen
                name={APP_SCREEN.ORDER_HISTORY}
                component={OrderHistoryScreen}
                options={homeOptions}
            />
            <Stack.Screen
                name={APP_SCREEN.FAVORITE_LIST}
                component={FavoriteListScreen}
                options={homeOptions}
            />
            <Stack.Screen
                name={APP_SCREEN.CURRENT_SEE}
                component={CurrentSeeListScreen}
                options={homeOptions}
            />
        </AuthStack.Navigator>
    );
};

const NavigationTab: React.FC<IProps> = (props: IProps) => {
        const userType = useSelector(
            (state: IState) => state?.app?.profile?.user_type
        );
        const [showSpinner, setShowSpinner] = useState<boolean>(true);
        const [statusBarHeight, setStatusBarHeight] = useState<number>(20);

        const loading = useSelector(
            (state: IState) => state?.app?.loading
        );

        let color = ColorsCustom.lime_green;

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
