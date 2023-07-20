import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ThemePage from "../components/ThemePage";
import ThemeText from "../components/ThemeText";
import { STRINGS } from '../common/strings';
import ThemeButton from '../components/ThemeButton';
import { useSelector } from 'react-redux';

const LeaderBoard = (props) => {

    const leaderBoard = useSelector((state) => {
        return state.app.leaderBoard;
    });

    return <ThemePage>
        <View style={{ marginBottom: 20, marginTop: 40 }}>
            <ThemeText title>{STRINGS.LEADER_BOARD}</ThemeText>
        </View>
        <View style={{ flex: 1, marginVertical: 10 }}>
            {
                leaderBoard.map((record, index) => {
                    return <View key={index + ""} style={{ marginVertical: 10 }}><ThemeText record>{`${index + 1}. ${record.name} - ${record.score}`}</ThemeText></View>
                })
            }
        </View>

        <View style={{ marginVertical: 20 }}>
            <ThemeButton naviBtn title={STRINGS.BACK} onPress={() => {
                props.navigation.goBack();
            }} />
        </View>
    </ThemePage>
}

export default LeaderBoard;