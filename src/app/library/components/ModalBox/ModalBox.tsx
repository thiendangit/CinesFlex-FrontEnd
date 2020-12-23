import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useCallback,
    memo,
    useMemo,
} from 'react';
import {ModalBoxProps} from './ModalBox.props';
import {Block, Icon, IconBack} from '@components';
import {styles} from './ModalBox.presets';
import {useTranslation} from 'react-i18next';
import {enhance, scale} from '@common';
import equals from 'react-fast-compare';
import Modal from 'react-native-modal';
import {icons} from "@assets/icon";
import {ColorsCustom} from "@theme/color";

const ModalBoxComponent = forwardRef((props: ModalBoxProps, ref) => {
    const [t] = useTranslation();
    const {
        rootStyle,
        onBackDropPress,
        backDropColor = 'rgba(0,0,0,.5)',
        closeOnBackDrop = true,
        children
    } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const _hideModal = useCallback(() => {
        setModalVisible(false);
    }, []);
    useImperativeHandle(
        ref,
        () => ({
            show: () => {
                setModalVisible(true);
            },
            hide: () => {
                _hideModal();
            },
        }),
        [],
    );

    const _onBackDropPress = useCallback(() => {
        typeof onBackDropPress === 'function' && onBackDropPress();
        closeOnBackDrop && setModalVisible(false);
    }, [onBackDropPress]);

    const root = useMemo(() => enhance([styles.wrap, rootStyle]), [rootStyle]);
    return (
        <Modal
            style={[styles.modal]}
            useNativeDriver={true}
            backdropOpacity={1}
            onBackdropPress={_onBackDropPress}
            isVisible={modalVisible}
            backdropColor={backDropColor}>
            <Block style={[root]}>
                {children}
                <Icon containerStyle={styles.iconBackContainer}
                      onPress={() => _hideModal()}
                      style={styles.iconBack}
                      icon={'close'}/>
            </Block>
        </Modal>
    );
});


export const ModalBox = memo(ModalBoxComponent, equals);

export interface ModalBoxRef {
    show(): void;
    hide(): void;
}
