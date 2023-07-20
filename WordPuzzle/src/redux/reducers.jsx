import { ADD_POINT, RESET, UPDATE_LEADER_BOARD, UPDATE_QUESTION_NUM, UPDATE_SELECTED_CATEGORY } from "./actions";

const initState = {
    selectedCategory: "",
    questionNum: 1,
    totalScore: 0,
    leaderBoard: [],
}

export const appReducer = (state = initState, action = {}) => {
    let returnState = {};
    Object.assign(returnState, state);
    switch (action.type) {
        case UPDATE_SELECTED_CATEGORY:
            returnState.selectedCategory = action.payload
            break;
        case UPDATE_QUESTION_NUM:
            returnState.questionNum++;
            break;
        case RESET:
            returnState.selectedCategory = "";
            returnState.questionNum = 1;
            returnState.totalScore = 0;
            break;
        case ADD_POINT:
            returnState.totalScore += action.payload;
            break;
        case UPDATE_LEADER_BOARD:
            returnState.leaderBoard = action.payload;
            break;
        default:
            returnState = state;
            break;
    }
    return returnState;
}