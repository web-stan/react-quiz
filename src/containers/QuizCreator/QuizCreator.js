import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {createControls, validate, validateForm} from '../../components/Form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
// import axios from 'axios'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'

function createOptionControl(number) {
    return createControls(
        {
        label: `Вариант ${number}`,
        errorMessage: '',
        id: number
        },
        {required: true})
}

function createFormControl() {
    return {
        question: createControls(            //каждый input
            {
            label: 'Введите вопрос',
            errorMessage: ''
            // errorMessage: 'Вопрос не может быть пустым' // Вариант Владилена
            },
            {required: true}),
        option1: createOptionControl(1),    //каждый input
        option2: createOptionControl(2),    //каждый input
        option3: createOptionControl(3),    //каждый input
        option4: createOptionControl(4)     //каждый input
        // label: "Вариант 1"
        // errorMessage: "Значение не может быть пустым"
        // validation: {required: true}
        // valid: false
        // touched: true
        // value: ""
    }
}


class QuizCreator extends Component {

    state= {
        // quiz: [],
        isValidForm: false,
        rightAnswerId: 1,
        formControls: createFormControl()

        // formControls:
                // question:
                    // label: "Введите вопрос"
                    // errorMessage: ""
                    // validation: {required: true}
                    // valid: false
                    // touched: true
                    // value: ""
                // option1:
                    // label: "Вариант 1"
                    // errorMessage: ""
                    // id: 1
                    // validation: {required: true}
                    // valid: false
                    // touched: true
                    // value: ""
                // option2: {label: "Вариант 2", errorMessage: "", id: 2, validation: {…}, valid: false, …}
                // option3: {label: "Вариант 3", errorMessage: "", id: 3, validation: {…}, valid: false, …}
                // option4: {label: "Вариант 4", errorMessage: "", id: 4, validation: {…}, valid: false, …}
         
    }

    submitHandler(event) {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()

        // const quiz = this.state.quiz.concat()
        // const index = quiz.length + 1
 
        const questionItems = {
            question: this.state.formControls.question.value,
            id: this.props.length + 1,
            rightAnswer: this.state.rightAnswerId,
            answers: [
                {text: this.state.formControls.option1.value,
                id: this.state.formControls.option1.id
                },
                {text: this.state.formControls.option2.value,
                id: this.state.formControls.option2.id
                },
                {text: this.state.formControls.option3.value,
                id: this.state.formControls.option3.id
                },
                {text: this.state.formControls.option4.value,
                id: this.state.formControls.option4.id
                }
            ]
        }

        // quiz.push(questionItems)

        this.props.createQuizQuestion(questionItems)

        this.setState({
            // quiz,
            isValidForm: false,
            rightAnswerId: 1,
            formControls: createFormControl()
        })

    }

    createQuizHandler = async event => {
        event.preventDefault()

        this.props.finishCreateQuiz()

        this.setState({
            isValidForm: false,
            rightAnswerId: 1,
            formControls: createFormControl()
        })


        // try {
        //     await axios.post('https://react-quiz-6002a.fire baseio.com/quizes.json', this.state.quiz)

        //     this.setState({
        //         quiz: [],
        //         isValidForm: false,
        //         rightAnswerId: 1,
        //         formControls: createFormControl()
        //     })
        // } 
        // catch(e) {
        //     console.log(e)
        // }
    }

    changeHandler = (value , controlName) => {
        const formControls = { ...this.state.formControls }
        const inputKind = { ...formControls[controlName] }

        inputKind.touched = true
        inputKind.value = value
        inputKind.valid = validate(inputKind.value, inputKind.validation)


        //Мой код, вывод ошибки
        if(controlName && value !== '') {
            inputKind.errorMessage = ''
        }
        else {
            inputKind.errorMessage = 'Значение не может быть пустым'
        }
    
        //Мой код, вывод ошибки

        formControls[controlName] = inputKind

        this.setState({
            formControls,
            isValidForm: validateForm(formControls)
        })

    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={index}>
                <Input
                    label={control.label}
                    value={control.value}
                    // valid={control.valid}
                    // touched={control.touched}
                    // shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />

                {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    // componentDidMount () {
    //     console.log(this.state.quiz)
    // }

    selectChangeHandler =  event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    
    render() {

    const select = <Select 
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options ={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создать тест</h1>

                    <form onSubmit={this.submitHandler}> 

                    {this.renderControls()}

                    {select}

                    <Button 
                        type="primary"
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isValidForm}
                    >
                        Добавить вопрос
                    </Button>
                    
                    <Button 
                        type="success"
                        onClick={this.createQuizHandler}
                        disabled={this.props.quiz.length === 0}
                    >
                        Создать тест
                    </Button>

                    </form>
                </div>
            </div>
        )
    }
}     

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: question => dispatch(createQuizQuestion(question)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)