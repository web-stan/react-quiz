import axios from 'axios'
import { 
    fetch_Quizes_Error, 
    fetch_Quizes_Start, 
    fetch_Quizes_Success, 
    fetch_Quiz_Success, 
    quiz_Set_State,
    finish_Quiz,
    quiz_Next_Question,
    retry_Quiz
} from './actionsTypes'

//actionCreator for QuizList(COMPONENT) in fetchQuizes()
export function fetchQuizes() { 
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('https://react-quiz-6002a.firebaseio.com/quizes.json')
            // console.log(response.data)
            
            const quizes = []
                
            // eslint-disable-next-line
            Object.keys(response.data).map((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест ${index + 1}`
                })
            })

          dispatch(fetchQuizesSuccess(quizes))

        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}

export function fetchQuizesStart() {  //actionCreator for QuizList in fetchQuizes()
    return {
        type: fetch_Quizes_Start,
    }
}
export function fetchQuizesSuccess(quizes) { //actionCreator for QuizList fetchQuizes()
    return {
        type: fetch_Quizes_Success,
        quizes
    }
}
export function fetchQuizesError(err) { //actionCreator for QuizList fetchQuizes()
    return {    
        type: fetch_Quizes_Error,
        error: err
    }
}



 //actionCreator for Quiz(COMPONENT) in fetchQuizById(id)
export function fetchQuizById(quizId) { 
    return async dispatch => {
        dispatch(fetchQuizesStart())  //используем этот метод,уже изменяет в reducer loading на true
        
        try {
            const response = await axios.get(`https://react-quiz-6002a.firebaseio.com/quizes/${quizId}.json`)
            const quiz = response.data
            
            dispatch(fetchQuizSuccess(quiz))

        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}

export function fetchQuizSuccess(quiz) { //actionCreator for fetchQuizById(id)
    return {
        type: fetch_Quiz_Success,
        quiz
    }
}

//actionCreator for Quiz(COMPONENT) in qiuzAnswerClick(idAnswer)
export function qiuzAnswerClick(idAnswer) { 
    return (dispatch, getState) => {

        //доступный State с getState().quiz
        // resalts: {},
        // isFinished: false,
        // activeQuestion: 0,
        // answerState: null,
        // loading: true,  //удаляем,так как loading уже есть
        // quiz: null

        const state = getState().quiz

        if(state.answerState) {
            const key = Object.keys(state.answerState)
            if(state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const resalts = state.resalts

        if(question.rightAnswer === idAnswer) {
            if(!resalts[question.id]) {
                resalts[question.id] = 'success'
            }

            dispatch(quizSetState({[idAnswer]: 'success'}, resalts))

            // this.setState({
            //     answerState: {[idAnswer]: 'success'},
            //     resalts
            // })
            
            const timeOut = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                    // this.setState({
                    //     isFinished: true
                    // })
                    // console.log('Finished')
                } else {

                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null,
                    // })
                }
                window.clearTimeout(timeOut)
            }, 1000)

        } else {
            resalts[question.id] = 'error'

            dispatch(quizSetState({[idAnswer]: 'error'}, resalts))

            // this.setState({
            //     answerState:  {[idAnswer]: 'error'},
            //     resalts
            // })
        }
    }
}

export function quizSetState(answerState, resalts) { //actionCreator for Quiz qiuzAnswerClick(idAnswer)
    return {
        type: quiz_Set_State,
        answerState,
        resalts
    }
}

export function finishQuiz() {  //actionCreator for Quiz qiuzAnswerClick(idAnswer)
    return {
        type: finish_Quiz
    }
}

export function quizNextQuestion(activeQuestion) { //actionCreator for Quiz qiuzAnswerClick(idAnswer)
    return {
        type: quiz_Next_Question,
        activeQuestion
    }
}

function isQuizFinished (state) { // function in qiuzAnswerClick(idAnswer)
    return state.activeQuestion + 1 === state.quiz.length
}


export function retryQuiz() {  //componentWillUnmount(){ this.props.retryQuiz()}   
    return {                   //actionCreator for Quiz retryQuiz()
        type: retry_Quiz
    }
    
}

