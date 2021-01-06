import React, {memo} from "react";
import {images} from '@assets/image'
import {styles} from './style'
import {Block, Button, Img, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {ColorsCustom} from "@theme/color";
import {NavigationService} from "@navigation/navigationService";
import {verticalScale} from "@common";
import isEqual from "react-fast-compare";

export interface Props {
    route: {
        params: {
            text: string,
            data: {
                booker_id: string
                id: string
                paid: string
                reference: string
                status: number
                total_paid: number
                type: number
                voucher_id: ""
            }
        }
    },
}

const BookTicketResultScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();

    let text = props.route.params?.text ?? '';
    let data = props.route.params?.data ?? '';

    const onPressButtonHome = () => {
        NavigationService.popToTop()
    };

    return (
        <Block style={styles.container}>
            <Img style={[styles.imageContainer]}
                 source={images.checkDone}
                 tintColor={ColorsCustom.blue}
                 resizeMode={"contain"}/>
            <Text style={styles.nameSupplierBuyer}>
                {t('common:success')}
            </Text>
            <Text style={[styles.text, {marginTop: verticalScale(10)}]}>
                {t('common:congratulation')}!
            </Text>
            <Text style={[styles.text, {marginTop: verticalScale(5)}]}>
                {text}
            </Text>
            <Text style={[styles.code, {marginTop: verticalScale(5)}]}>
                Your code : {data?.reference}
            </Text>
            <Button
                onPress={onPressButtonHome}
                style={[styles.buttonLogin, {backgroundColor: ColorsCustom.blue}]}>
                <Text style={styles.textButton}>
                    {t('common:ContinueBuy')}
                </Text>
            </Button>
        </Block>
    )
};

export default memo(BookTicketResultScreen, isEqual);
