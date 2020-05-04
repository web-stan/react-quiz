// import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Louder/Louder';
import classes from './Quiz.module.css';
import { fetchQuizById, qiuzAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {

    // state={
    //исходны state
        // resalts: {},
        // isFinished: false,
        // activeQuestion: 0,
        // answerState: null,
        // loading: true,
        // quiz: [],

        // Исходный массив,по котрому создавали вопросы; ActiveQuiz > AnswerList > ActiveItem
        // quiz: [
        //     {   
        //         question: 'Какого цвета небо?',
        //         rightAnswer: 2,
        //         id: 1,
        //         answers: [
        //             {text: 'Черный', id: 1},
        //             {text: 'Синий', id: 2},
        //             {text: 'Красный', id: 3},
        //             {text: 'Зеленый', id: 4}
        //         ]
        //     },
        //     {   
        //         question: 'Какой го Санкт-Петербург',
        //         rightAnswer: 3,
        //         id: 2,
        //         answers: [
        //             {text: '1701', id: 1},
        //             {text: '1702', id: 2},
        //             {text: '1703', id: 3},
        //             {text: '1704', id: 4}
        //         ]
        //     }
        // ]
    // }
    // вместо onAnswerClickHandler передаем сразу qiuzAnswerClick (this.props.qiuzAnswerClick)
    // onAnswerClickHandler = idAnswer => {
        // if(this.state.answerState) {
        //     const key = Object.keys(this.state.answerState)
        //     if(this.state.answerState[key] === 'success') {
        //         return
        //     }
        // }

        // const question = this.state.quiz[this.state.activeQuestion]
        // const resalts = this.state.resalts

        // if(question.rightAnswer === idAnswer) {
        //     if(!resalts[question.id]) {
        //         resalts[question.id] = 'success'
        //     }

        //     this.setState({
        //         answerState: {[idAnswer]: 'success'},
        //         resalts
        //     })
            
        //     const timeOut = window.setTimeout(() => {
        //         if (this.isQuizFinished()) {
        //             this.setState({
        //                 isFinished: true
        //             })
        //             console.log('Finished')
        //         } else {
        //             this.setState({
        //                 activeQuestion: this.state.activeQuestion + 1,
        //                 answerState: null,
        //             })
        //         }
        //         window.clearTimeout(timeOut)
        //     }, 1000)

        // } else {
        //     resalts[question.id] = 'error'
        //     this.setState({
        //         answerState:  {[idAnswer]: 'error'},
        //         resalts
        //     })
        // }

        
    // }



    //переносим в actioncreator qiuzAnswerClick(idAnswer)
    // isQuizFinished = () =>{
    //     return this.state.activeQuestion + 1 === this.state.quiz.length
    // }

    // retryHandler = () => {
    //     this.setState({
    //         resalts: {},
    //         isFinished: false,
    //         activeQuestion: 0,
    //         answerState: null
    //     })
    // }

    componentDidMount () {
        this.props.fetchQuizById(this.props.match.params.id)

    }

    componentWillUnmount(){
        this.props.retryQuiz()
    }


    // async componentDidMount () {
    //     // try {
    //     //     const response = await axios.get(`https://react-quiz-6002a.firebaseio.com/quizes/${this.props.match.params.id}.json`)
    //     //     const quiz = response.data

    //     //     // console.log(response, quiz)

    //     //     this.setState({
    //     //         quiz,
    //     //         loading: false
    //     //     })

    //     //     console.log(this.state.quiz)


    //     // } catch (err) {
    //     //     console.log(err)
    //     // }
    // }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                <h1>Ответьте на вопросы</h1>
                
                { 
                    this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                                ? <FinishedQuiz 
                                        retry = {this.props.retryQuiz}
                                        resalts={this.props.resalts}
                                        quiz={this.props.quiz}
                                    /> 
                                : <ActiveQuiz 
                                        question = {this.props.quiz[this.props.activeQuestion].question}
                                        answers = {this.props.quiz[this.props.activeQuestion].answers}
                                        // onAnswerClick = {this.onAnswerClickHandler}
                                        onAnswerClick = {this.props.qiuzAnswerClick}
                                        quizLength = {this.props.quiz.length}
                                        answerNumber = {this.props.activeQuestion + 1}
                                        state = {this.props.answerState}
                                        >
                                    </ActiveQuiz>
                }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        resalts: state.quiz.resalts,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        qiuzAnswerClick: idAnswer => dispatch(qiuzAnswerClick(idAnswer)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)
