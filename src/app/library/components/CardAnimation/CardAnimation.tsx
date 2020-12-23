import React, {
    forwardRef,
    memo,
} from 'react';
import {CardAnimationProps} from './CardAnimation.props';
import {Block, ListView, Text} from '@components';
import {useTranslation} from 'react-i18next';
import equals from 'react-fast-compare';
import Card, {cards} from "@library/components/CardAnimation/Card";
import {scale} from "@common";
import {TouchableOpacity} from "react-native-gesture-handler";


const CardAnimationComponent = forwardRef((props: CardAnimationProps, ref) => {
    const [t] = useTranslation();
    const {
        children
    } = props;

    const renderCard = ({item, index}: any) => {
        return (
            <Card card={item} index={index} onPress={props.onPressCard}/>
        )
    };

    return (
        <Block block>
            <ListView data={props.cards}
                      ItemSeparatorComponent={() => {
                          return (
                              <Block height={scale(5)}/>
                          )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderCard}
            />
        </Block>
    );
});


export const CardAnimation = memo(CardAnimationComponent, equals);

export interface CardAnimationRef {
    show(): void;

    hide(): void;
}
