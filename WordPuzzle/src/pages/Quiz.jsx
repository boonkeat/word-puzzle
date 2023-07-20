import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ThemePage from "../components/ThemePage";
import ThemeText from "../components/ThemeText";
import { STRINGS } from '../common/strings';
import { CATEGORIES } from '../common/data';
import ThemeButton from '../components/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, } from '../redux/actions';
import ThemeLetter from '../components/ThemeLetter';

const Quiz = (props) => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => {
        return state.app.selectedCategory;
    });

    const questionNum = useSelector((state) => {
        return state.app.questionNum;
    });

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const [questions, setQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState([]);
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        for (let i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].name === selectedCategory) {
                setQuestions(CATEGORIES[i].file);
                break;
            }
        }
    }, []);

    useEffect(() => {
        if (questions[questionNum - 1] !== undefined) {
            let answer = questions[questionNum - 1].answer;
            answer = answer.replaceAll(" ", "");
            let userInput = "";
            for (let i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i] >= 0) {
                    userInput += letters[userAnswer[i]];
                }
            }
            if (answer === userInput) {
                props.navigation.navigate('Summary', { isCorrect: true });
            }
        }
    }, [userAnswer])

    useEffect(() => {
        let question = questions[questionNum - 1];
        if (question !== undefined && question !== null) {
            let tempUserAnswer = [];
            for (let i = 0; i < question.answer.replaceAll(" ", "").length; i++) {
                tempUserAnswer.push(-1);
            }
            setUserAnswer(tempUserAnswer);
            setLetters(shuffleArray(questions[questionNum - 1].answer.replaceAll(" ", "").split("")));
        }
    }, [questions, questionNum])

    return <ThemePage>
        <View style={{ marginBottom: 20, marginTop: 40 }}>
            <ThemeText title>{`${questionNum}/${questions.length}`}</ThemeText>
        </View>
        <View style={{ flex: 1, marginVertical: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-end' }}>
            {
                userAnswer.map((letterIndex, index) => {
                    return <ThemeLetter
                        letter={letters[letterIndex]}
                        key={index + ""}
                        onPress={() => {
                            let tempUserAnswer = [...userAnswer];
                            tempUserAnswer[index] = -1;
                            setUserAnswer(tempUserAnswer);
                        }} />
                })
            }
        </View>
        <View style={{ marginVertical: 10, flexDirection: 'column' }}>
            {questions[questionNum - 1] && <ThemeText hint>{questions[questionNum - 1].hint}</ThemeText>}
        </View>
        <View style={{ flex: 1, marginVertical: 40, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
            {
                letters.map((letter, index) => {
                    return <ThemeLetter
                        letter={!userAnswer.includes(index) ? letter : ''}
                        key={index + ""}
                        onPress={() => {
                            if (!userAnswer.includes(index)) {
                                let tempUserAnswer = [...userAnswer];
                                for (let i = 0; i < tempUserAnswer.length; i++) {
                                    if (tempUserAnswer[i] === -1) {
                                        tempUserAnswer[i] = index;
                                        break;
                                    }
                                }
                                setUserAnswer(tempUserAnswer);
                            }
                        }} />
                })
            }
        </View>
        <View style={{ marginVertical: 20 }}>
            <ThemeButton naviBtn title={STRINGS.SKIP} onPress={() => {
                if (questionNum < questions.length) {
                    dispatch(nextQuestion())
                } else {
                    props.navigation.navigate('Summary', { isCorrect: false });
                }
            }} />
        </View>
    </ThemePage>
}

export default Quiz;