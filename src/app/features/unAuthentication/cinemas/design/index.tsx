import React, {useEffect, useState} from "react";
import {images, ImageTypes} from '@assets/image'
import {styles} from './style'
import {Block, Button, IconBack, Img, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {StyleProp} from "react-native";
import {ColorsCustom} from "@theme/color";
import {NavigationService} from "@navigation/navigationService";
import {APP_SCREEN, RootStackParamList} from "@navigation/screenTypes";
import {Constants, dispatch, scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";

export interface CinemasParamProps {
    route: {
        params: {
            film: FilmProps
        }
    },
}

export interface RegionProps {
    cinemas: []
    description: string
    id: string
    name: string
    status: number
    type: number
}

type CinemasProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME> | CinemasParamProps;

export const CinemasScreen: React.FC<CinemasProps> = (props) => {

    const film = props.route.params?.film || null;
    const [t] = useTranslation();
    const _onGoBack = () => {
        NavigationService.goBack()
    };
    const [regions, setRegions] = useState<RegionProps[] | []>([]);
    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );
    useEffect(() => {
        //fetch region list
        dispatch(actionsCinemas.getDataCinemas(`${URL_DOMAIN}regions`, (result) => {
            if (result?.data?.data && result.data.success) {
                setRegions(result.data.data)
            }
        }))
    }, []);

    const buttonChooseRegion = (text: string, source: ImageTypes, borderColor: StyleProp<any>, onPress: (text: string) => void) => {
        return (
            <Button key={text} style={[styles.buttonSupplier_Buyer, {borderColor}]} onPress={() => onPress(text)}>
                <Text style={[styles.nameSupplierBuyer, {color: borderColor}]}>
                    {text && t(`user:${text}`) || ''}
                </Text>
            </Button>
        )
    };

    const onPressButtonRegion = (index: number) => {
        NavigationService.navigate(APP_SCREEN.CINEMAS_DETAILS, {region: regions[index], film})
    };

    return (
        <Block style={styles.container}>
            {/*<Wallpaper backgroundImage={images.bg_cinemas}/>*/}
            <Screen style={{}}>
                <Text style={styles.text}> REGION LIST </Text>
                <Img style={styles.imageBG}
                     resizeMode={'contain'}
                     source={images.bg_cinemas_festival}
                />
                <Block style={styles.buttonContainer}>
                    {buttonChooseRegion("HÀ NỘI", images.temple, ColorsCustom.lime_green, () => onPressButtonRegion(0))}
                    <Block direction={'row'} alignItems={'center'} marginTop={scale(10)} marginBottom={scale(10)}>
                        <Block height={1} width={deviceWidth / 4} style={{backgroundColor: ColorsCustom.lightGrey}}/>
                        <Text style={{marginHorizontal: scale(10)}}>OR</Text>
                        <Block height={1} width={deviceWidth / 4} style={{backgroundColor: ColorsCustom.lightGrey}}/>
                    </Block>
                    {buttonChooseRegion("TP. HCM", images.building, ColorsCustom.light_red, () => onPressButtonRegion(1))}
                </Block>
            </Screen>
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
