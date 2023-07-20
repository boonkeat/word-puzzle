import { Text } from "react-native";
import { BLACK_COLOR, LARGE_FONT_SIZE, } from "../../assets/theme";

const ThemeLetter = (props) => {
    return <Text
        style={{ color: BLACK_COLOR, textAlign: 'center', fontSize: LARGE_FONT_SIZE, borderWidth: 1, borderColor: BLACK_COLOR, width: 35, height: 35, margin: 7 }}
        onPress={props.onPress}
    >{props.letter}</Text>
}

export default ThemeLetter;