import { ScrollView, View } from "react-native";

const ThemePage = (props) => {
    return <ScrollView
        style={{ width: '100%', height: '100%', }}
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <View style={{ flex: 1, width: '80%' }}>
            {props.children}
        </View>
    </ScrollView>
}

export default ThemePage;