import { Alert, View } from 'react-native';
import ThemePage from "../components/ThemePage";
import ThemeText from "../components/ThemeText";
import { STRINGS } from '../common/strings';
import { CATEGORIES } from '../common/data';
import ThemeButton from '../components/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../redux/actions';
import { useEffect } from 'react';

const Home = (props) => {

    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => {
        return state.app.selectedCategory;
    })

    return <ThemePage>
        <View style={{ marginVertical: 40 }}>
            <ThemeText title>{STRINGS.APP_NAME}</ThemeText>
        </View>
        <View style={{ flex: 1, marginVertical: 10 }}>
            {CATEGORIES.map((category, index) => {
                // console.log(index)
                return <ThemeButton key={index + ""} isSelected={category.name === selectedCategory} title={category.name} onPress={() => { dispatch(updateCategory(category.name)) }} />
            })}
            <ThemeButton naviBtn title={STRINGS.START} onPress={() => {
                if (selectedCategory !== '') {
                    props.navigation.navigate('Quiz');
                } else {
                    Alert.alert("", STRINGS.CATERGORY_ERROR);
                }
            }} />
        </View>
        <View style={{ marginVertical: 20 }}>
            <ThemeText onPress={() => props.navigation.navigate('LeaderBoard')}>{STRINGS.LEADER_BOARD}</ThemeText>
        </View>
    </ThemePage>
}

export default Home;