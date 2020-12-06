import {ImageStyle, StyleProp, ViewStyle} from "react-native";
import {IconTypes} from "@assets/icon";

export interface SearchRightProps {
  /**
   * Overwrite icon style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap icon style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Icon type
   * @default undefined
   */
  icon?: IconTypes;

  onPress?: () => void

}
