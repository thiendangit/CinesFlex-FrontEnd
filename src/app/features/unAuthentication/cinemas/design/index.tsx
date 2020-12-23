import React from "react";
import {images, ImageTypes} from '@assets/image'
import {styles} from './style'
import {Block, Button, IconBack, Img, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {StyleProp} from "react-native";
import {ColorsCustom} from "@theme/color";
import {NavigationService, navigationRef} from "@navigation/navigationService";
import {APP_SCREEN, RootStackParamList} from "@navigation/screenTypes";
import {Constants, dispatch, scale, verticalScale} from "@common";
import {onSetAppProfile} from "@app_redux/reducer";
import {deviceHeight, deviceWidth} from "@utils";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";

export interface CinemasParamProps {
    route: {
        params: {
            film: FilmProps
        }
    },
}

type CinemasProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME> | CinemasParamProps;

export const CinemasScreen: React.FC<CinemasProps> = (props) => {

    const film = props.route.params?.film || null;
    const [t] = useTranslation();
    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const buttonSupplierBuyer = (text: string, source: ImageTypes, borderColor: StyleProp<any>, onPress: (text: string) => void) => {
        return (
            <Button key={text} style={[styles.buttonSupplier_Buyer, {borderColor}]} onPress={() => onPress(text)}>
                {/*<Img style={styles.imageSupplier_Buyer}*/}
                {/*     source={source}*/}
                {/*     resizeMode={"contain"}/>*/}
                <Text style={[styles.nameSupplierBuyer, {color: borderColor}]}>
                    {text && t(`user:${text}`) || ''}
                </Text>
            </Button>
        )
    };

    const onPressButtonRegion = (text: string) => {
        // dispatch(onSetAppProfile({user_type: Constants.ROLE.BUYER}));
        NavigationService.navigate(APP_SCREEN.CINEMAS_DETAILS, {region: 1, film})
    };

    return (
        <Block style={styles.container}>
            {/*<Wallpaper backgroundImage={images.bg_cinemas}/>*/}
            <Screen style={{}}>
                <Text style={styles.text}>
                    REGION LIST
                </Text>
                <Img style={{
                    height: deviceHeight / 2.3,
                    width: deviceWidth
                }}
                     resizeMode={'contain'}
                     source={images.bg_cinemas_festival}
                />
                <Block style={styles.buttonContainer}>
                    {buttonSupplierBuyer("HÀ NỘI", images.temple, ColorsCustom.lime_green, onPressButtonRegion)}
                    <Block direction={'row'} alignItems={'center'} marginTop={scale(10)} marginBottom={scale(10)}>
                        <Block height={1} width={deviceWidth / 4} style={{backgroundColor: ColorsCustom.lightGrey}}/>
                        <Text style={{marginHorizontal: scale(10)}}>OR</Text>
                        <Block height={1} width={deviceWidth / 4} style={{backgroundColor: ColorsCustom.lightGrey}}/>
                    </Block>
                    {buttonSupplierBuyer("TP. HCM", images.building, ColorsCustom.light_red, onPressButtonRegion)}
                </Block>
            </Screen>
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
