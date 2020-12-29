import React, {forwardRef, MutableRefObject, Ref, useState} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Image, View, TextInput, Keyboard} from "react-native";
import Animated, {Easing, timing, Value} from 'react-native-reanimated'
import {useTheme} from "react-native-paper";
import styles from "@library/components/SeachBarAnimation/styles";
import {deviceHeight, deviceWidth} from "@utils";
import {images} from "@assets/image";
import {icons} from "@assets/icon";
import {SearchRight} from "@components";
import {scale} from "@common";

interface Props_Search {
    text: string,
    onChangeTextSearch: Function,
    ref: MutableRefObject<any>,
    isFocus: boolean,
    placeHolder: string,
    onSubmit: (text: string) => void
}


const SearchBarAnimation: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.PropsWithoutRef<{}> & React.RefAttributes<unknown> & Props_Search> & React.RefAttributes<unknown>> = forwardRef((props, ref: Ref<any>) => {

    const [_input_box_translate_x] = useState(new Value(deviceWidth));
    const [_back_button_opacity] = useState(new Value(0));
    const [_content_translate_y] = useState(new Value(deviceHeight));
    const [_content_opacity] = useState(new Value(0));
    const [searchQuery, setSearchQuery] = useState<string>(props.text);

    const {colors: {text}} = useTheme();
    const _onFocus = () => {
        props.onChangeTextSearch(searchQuery, true);
        const input_box_translate_x_config = {
            duration: 600,
            toValue: 5,
            easing: Easing.inOut(Easing.ease)
        };
        const back_button_opacity_config = {
            duration: 600,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        };

        // content
        const content_translate_y_config = {
            duration: 600,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        };
        const content_opacity_config = {
            duration: 600,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        };

        // run animation
        timing(_input_box_translate_x, input_box_translate_x_config).start();
        timing(_back_button_opacity, back_button_opacity_config).start();
        timing(_content_translate_y, content_translate_y_config).start();
        timing(_content_opacity, content_opacity_config).start();
    };
    const _onBlur = () => {
        props.onChangeTextSearch(searchQuery, false);
        const input_box_translate_x_config = {
            duration: 600,
            toValue: deviceWidth,
            easing: Easing.inOut(Easing.ease)
        };
        const back_button_opacity_config = {
            duration: 600,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        };

        // content
        const content_translate_y_config = {
            duration: 600,
            toValue: deviceHeight,
            easing: Easing.inOut(Easing.ease)
        };
        const content_opacity_config = {
            duration: 600,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        };

        // run animation
        timing(_input_box_translate_x, input_box_translate_x_config).start();
        timing(_back_button_opacity, back_button_opacity_config).start();
        timing(_content_translate_y, content_translate_y_config).start();
        timing(_content_opacity, content_opacity_config).start();
        Keyboard.dismiss()
    };

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <View style={styles.container_Search}>
            <View style={styles.container}>
                <View style={{width: deviceWidth / 2, height: 40}}>
                </View>
                <SearchRight style={{tintColor: 'white'}} containerStyle={{
                    position: 'absolute',
                    right: 0,
                    top: scale(0)
                }}
                             onPress={_onFocus}
                />
                <Animated.View
                    style={[styles.input_box, {transform: [{translateX: _input_box_translate_x}]}]}
                >
                    <Animated.View style={{opacity: _back_button_opacity}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={_onBlur}
                            style={styles.back_icon_box}
                        >
                            <Image source={icons.back} resizeMode={'contain'}
                                   style={[styles.clear_icon_box, {tintColor: text}]}/>
                        </TouchableOpacity>
                    </Animated.View>
                    <TextInput
                        keyboardType="default"
                        ref={ref}
                        placeholder={props.placeHolder ?? "Search Facebook"}
                        clearButtonMode="always"
                        value={searchQuery}
                        onChangeText={(value) => onChangeSearch(value)}
                        style={styles.input}
                        returnKeyLabel={'search'}
                        returnKeyType={'search'}
                        onSubmitEditing={() => props.onSubmit(searchQuery)}
                    />
                </Animated.View>
            </View>
        </View>
    )
});


export default SearchBarAnimation
