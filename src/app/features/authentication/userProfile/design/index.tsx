import React, {memo, useEffect} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Header, Img, Text} from "@components"
import {Alert} from "react-native";
import {dispatch, useSelector, verticalScale} from "@common";
import {styles} from "@features/authentication/userProfile/design/style";
import {ColorsCustom} from "@theme/color";
import {tabItem} from "@config/type";
import {onLogout} from "@app_redux/reducer";
import {AppState} from "@app_redux/type";
import {NavigationService} from "@navigation/navigationService";
type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const MoreScreen = ({navigation, route}: MoreProps) => {

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    useEffect(()=>{
        if(!token){
            NavigationService.navigate(APP_SCREEN.LOGIN)
        }
    },[token]);


    const _renderHeaderView = () => {
        return (
            <Block>
                <Header headerText={'UserProfile'}
                        titleStyle={styles().headerTitle}
                        style={[
                            styles().header,
                            {
                                backgroundColor: ColorsCustom.lime_green
                            }]
                        }/>
            </Block>
        )
    };

    const _onLogout = (item: tabItem) => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                {
                    text: "Yes", onPress: async () => {
                        dispatch(onLogout())
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
            ],
            {cancelable: false}
        );
    };

    const _renderLogoutButton = () => {
        return (
            <Block block>
                <Button style={styles().buttonLogout}
                        activeOpacity={1}
                >
                    <Img style={styles().imageContainer}/>}
                    <Text style={styles().textLogout}>
                        Logout
                    </Text>
                </Button>
                <Block style={{height: verticalScale(10)}}/>
            </Block>
        )
    };

    return (
        <Block style={styles().container}>
            {_renderHeaderView()}
        </Block>
    );
};

export default memo(MoreScreen, isEqual);
