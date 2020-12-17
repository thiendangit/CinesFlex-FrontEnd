import React, {memo} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Header} from "@components"
import {ColorsCustom} from "@theme/color";
import {styles} from "@features/unAuthentication/promotion/design/style";
type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const PromotionScreen = ({navigation, route}: MoreProps) => {

    const _renderHeaderView = () => {
        return (
            <Block>
                <Header headerText={'Promotion'}
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

    return (
        <Block style={styles().container}>
            {_renderHeaderView()}
        </Block>
    );
};

export default memo(PromotionScreen, isEqual);
