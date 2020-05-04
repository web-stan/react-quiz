import { create_Quiz_Question, reset_Quiz_Creation } from "./actionsTypes"
import axios from "axios"

export function createQuizQuestion(question) {
    return {
        type: create_Quiz_Question,
        question
    }
}

export function resetQuizCreation() {
    return {
        type: reset_Quiz_Creation
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('https://react-quiz-6002a.firebaseio.com/quizes.json', getState().create.quiz)

        dispatch(resetQuizCreation())
    }

   
}