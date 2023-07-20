export const UPDATE_SELECTED_CATEGORY = "UPDATE_SELECTED_CATEGORY";
export const UPDATE_QUESTION_NUM = "UPDATE_QUESTION_NUM";
export const RESET = "RESET";
export const ADD_POINT = "ADD_POINT";
export const UPDATE_LEADER_BOARD = "UPDATE_LEADER_BOARD";

export const updateCategory = (category) => {
    // console.log(category)
    return { type: UPDATE_SELECTED_CATEGORY, payload: category };
}

export const nextQuestion = () => {
    return { type: UPDATE_QUESTION_NUM };
}

export const reset = () => {
    return { type: RESET };
}

export const addPoint = (point) => {
    return { type: ADD_POINT, payload: point };
}

export const updateLeaderBoard = (arr) => {
    return { type: UPDATE_LEADER_BOARD, payload: arr };
}