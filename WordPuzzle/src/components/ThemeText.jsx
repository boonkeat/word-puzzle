import { Text } from "react-native";
import { BLACK_COLOR, BLUE_COLOR, DARK_BLUE_COLOR, GREEN_COLOR, NORMAL_FONT_SIZE, SMALL_FONT_SIZE, X_SMALL_FONT_SIZE } from "../../assets/theme";

const ThemeText = (props) => {
    const style = { color: BLACK_COLOR, textAlign: 'center' }
    return <Text style={
        props.title ?
            { ...style, fontSize: NORMAL_FONT_SIZE, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: DARK_BLUE_COLOR, backgroundColor: BLUE_COLOR } :
            props.hint ? { ...style, fontSize: SMALL_FONT_SIZE } :
                props.result ? { ...style, fontSize: NORMAL_FONT_SIZE, color: GREEN_COLOR } :
                    props.record ? { ...style, fontSize: NORMAL_FONT_SIZE, flexWrap: 'wrap' } :
                        { ...style, fontSize: NORMAL_FONT_SIZE }
    }
        onPress={props.onPress}
    >{props.children}</Text>
}

export default ThemeText;