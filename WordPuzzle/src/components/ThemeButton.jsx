import { TouchableOpacity, Text } from "react-native";
import { BLACK_COLOR, BLUE_COLOR, DARK_RED_COLOR, LIGHT_GRAY_COLOR, NORMAL_FONT_SIZE, RED_COLOR } from "../../assets/theme";

const ThemeButton = (props) => {
    const style = {
        marginHorizontal: 20,
        marginVertical: 15,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 1,
    };
    return <TouchableOpacity
        onPress={props.onPress}
        style={props.naviBtn ? {
            ...style, ...{
                borderColor: DARK_RED_COLOR,
                backgroundColor: RED_COLOR,
            }
        } : {
            ...style, ...{
                borderRadius: 5,
                borderColor: BLACK_COLOR,
                backgroundColor: props.isSelected ? LIGHT_GRAY_COLOR : undefined,
            }
        }}
    >
        <Text style={{ textAlign: 'center', color: BLACK_COLOR, fontSize: NORMAL_FONT_SIZE }}>{props.title}</Text>
    </TouchableOpacity>
}

export default ThemeButton;