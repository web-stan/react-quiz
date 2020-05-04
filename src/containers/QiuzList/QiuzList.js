import React, { Component } from 'react'
import classes from './QiuzList.module.css'
import {NavLink} from 'react-router-dom'
// import axios from 'axios'
import Louder from '../../components/UI/Louder/Louder'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'
 
 class QiuzList extends Component {

    // state = {
    //     quizes: [],
    //     loading: true
    // }

    renderQuiz() {
        return this.props.quizes.map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={'/quiz/' + quiz.id}
                    >{quiz.name}
                    </NavLink>
                </li>

            )
        })
    }

   componentDidMount () {
       this.props.fetchQuizes()
        // try {
        //    const response = await axios.get('https://react-quiz-6002a.firebaseio.com/quizes.json')
        //     // console.log(response.data)
           
        //     const quizes = []
             
        //     // eslint-disable-next-line
        //     Object.keys(response.data).map((key, index) => {
        //         quizes.push({
        //             id: key,
        //             name: `Тест ${index + 1}`
        //         })
        //     })

        //     this.setState({
        //         quizes,
        //         loading: false
        //     })

        // } catch (err) {
        //     console.log(err)
        // }
    }
    
    render() {

        return (
            <div className={classes.QiuzList}>

                <div>
                    <h1>Список тестов</h1>

                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Louder />
                            : <ul>{this.renderQuiz()}</ul>
                    }
                    
                </div>
            </div>
        )
    }
}    

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QiuzList)








