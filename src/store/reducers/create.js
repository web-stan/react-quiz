import { create_Quiz_Question, reset_Quiz_Creation } from "../actions/actionsTypes"

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action) {
   switch (action.type) {
       case create_Quiz_Question:
           return {
               ...state,
               quiz: [...state.quiz, action.question] //так добавляем в массив еше один объект(вопрос),  
           }                                          //без [...state.quiz, не будет копироваться существующий
        case reset_Quiz_Creation:                     //и к нему новый объект, а просто перезаписываться каждыц раз новый
            return {
                ...state,
                quiz: []
            }
      default: 
       return state
   }
}