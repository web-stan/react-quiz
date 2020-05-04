import { 
    fetch_Quizes_Start, 
    fetch_Quizes_Success, 
    fetch_Quizes_Error, 
    fetch_Quiz_Success, 
    quiz_Set_State,
    quiz_Next_Question,
    finish_Quiz,
    retry_Quiz
} from '../actions/actionsTypes'


const initialState = {
    quizes: [],
    loading: false, 
    error: null,
    // state of Quiz Component
    resalts: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    // loading: true,  //удаляем,так как loading уже есть
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case fetch_Quizes_Start:
            return {
                ...state, loading: true
            }
        case fetch_Quizes_Success:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case fetch_Quizes_Error:
            return {
                ...state, loading: false, error: action.error
            }
        case fetch_Quiz_Success:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case quiz_Set_State:
            return {
                ...state, answerState: action.answerState, resalts: action.resalts
            }
        case finish_Quiz:
            return {
                ...state, isFinished: true
            }
        case quiz_Next_Question:
            return {
                ...state, answerState: null, activeQuestion: action.activeQuestion
            }
        case retry_Quiz:
            return {
                ...state, 
                resalts: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null
            }
        default: 
            return state
    }
}