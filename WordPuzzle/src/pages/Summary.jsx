import React, { useEffect, useState } from 'react';
import { Alert, Share, View } from 'react-native';
import ThemePage from "../components/ThemePage";
import ThemeText from "../components/ThemeText";
import { STRINGS } from '../common/strings';
import { CATEGORIES } from '../common/data';
import ThemeButton from '../components/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { addPoint, nextQuestion, reset, updateLeaderBoard, } from '../redux/actions';
import DialogInput from 'react-native-dialog-input';

const Summary = (props) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => {
        return state.app.selectedCategory;
    });

    const questionNum = useSelector((state) => {
        return state.app.questionNum;
    });

    const leaderBoard = useSelector((state) => {
        return state.app.leaderBoard;
    });

    const totalScore = useSelector((state) => {
        return state.app.totalScore;
    });

    const [questions, setQuestions] = useState([]);
    const [points, setPoints] = useState(0);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    useEffect(() => {
        let tempQuestions = []
        for (let i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].name === selectedCategory) {
                setQuestions(CATEGORIES[i].file);
                tempQuestions = CATEGORIES[i].file
                break;
            }
        }

        if (props.navigation.state.params.isCorrect && tempQuestions[questionNum - 1]) {
            if (questionNum < tempQuestions.length) {
                setPoints(tempQuestions[questionNum - 1].complexity * tempQuestions[questionNum - 1].answer.length);
            } else {
                dispatch(addPoint(tempQuestions[questionNum - 1].complexity * tempQuestions[questionNum - 1].answer.length));
            }
        }
    }, []);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `I had scored ${totalScore} points in ${STRINGS.APP_NAME}.`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return <ThemePage>
        <DialogInput isDialogVisible={isDialogVisible}
            title={STRINGS.CONGRATULATION}
            message={STRINGS.LEADER_BOARD_MSG}
            hintInput={STRINGS.PLAYER_NAME}
            submitInput={(inputText) => {
                if (leaderBoard.length < 10) {
                    let tempLeaderBoard = [...leaderBoard]
                    tempLeaderBoard.push({ name: inputText, score: totalScore });
                    tempLeaderBoard.sort((a, b) => {
                        return b.score - a.score;
                    });
                    // console.log(JSON.stringify(tempLeaderBoard))
                    dispatch(updateLeaderBoard(tempLeaderBoard));
                } else {
                    let tempLeaderBoard = [...leaderBoard]
                    tempLeaderBoard[tempLeaderBoard.length - 1] = { name: inputText, score: totalScore };
                    tempLeaderBoard.sort((a, b) => {
                        return b.score - a.score;
                    });
                    // console.log(JSON.stringify(leaderBoard))
                    dispatch(updateLeaderBoard(tempLeaderBoard));
                }
                dispatch(reset());
                props.navigation.navigate('Home');
            }}
            closeDialog={() => {
                setIsDialogVisible(false);
                dispatch(reset());
                props.navigation.navigate('Home');
            }} />
        <View style={{ marginBottom: 20, marginTop: 40 }}>
            <ThemeText title>{`${questionNum}/${questions.length}`}</ThemeText>
        </View>
        <View style={{ flex: 1, marginVertical: 10, justifyContent: 'center', alignContent: 'center' }}>
            {
                questionNum < questions.length ? (
                    <View>
                        <View style={{ marginVertical: 10 }}><ThemeText result>{STRINGS.CORRECT}</ThemeText></View>
                        <View style={{ marginVertical: 10 }}><ThemeText result>{STRINGS.POINT_EARN_1}{points}{STRINGS.POINT_EARN_2}</ThemeText></View>
                    </View>
                ) : (
                    <View>
                        <View style={{ marginVertical: 10 }}><ThemeText result>{STRINGS.SUMMARY_1}</ThemeText></View>
                        <View style={{ marginVertical: 10 }}><ThemeText result>{STRINGS.SUMMARY_2}{totalScore}</ThemeText></View>
                    </View>
                )
            }
        </View>

        <View style={{ marginVertical: 20 }}>
            <ThemeButton title={STRINGS.SHARE} onPress={onShare} />
            <ThemeButton naviBtn title={STRINGS.NEXT} onPress={() => {
                if (questionNum < questions.length) {
                    dispatch(nextQuestion())
                    dispatch(addPoint(points))
                    props.navigation.navigate('Quiz');
                } else {
                    if (leaderBoard.length < 10) {
                        setIsDialogVisible(true);
                    } else {
                        let lastRecord = leaderBoard[leaderBoard.length - 1];
                        if (totalScore > lastRecord.score) {
                            setIsDialogVisible(true);
                        } else {
                            dispatch(reset());
                            props.navigation.navigate('Home');
                        }
                    }
                }
            }} />
        </View>
    </ThemePage>
}

export default Summary;