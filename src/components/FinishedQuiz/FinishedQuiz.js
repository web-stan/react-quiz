import React from 'react';
import classes from './FinishedQuiz.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom'


const FinishedQuiz = props => {
    const successCount = Object.keys(props.resalts).reduce((tottal, key) => {
        if (props.resalts[key] === 'success') {
             tottal++
        }
        return tottal
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
            { 
            props.quiz.map((quizItem, index) => {
                const cls1 = props.resalts[quizItem.id] === 'success' 
                ? <FontAwesomeIcon className={classes.success} style={{marginLeft: 10}} icon={faCheck} />
                : <FontAwesomeIcon className={classes.error} style={{marginLeft: 10}} icon={faTimes} />
                
            return (
                <li key={index}>
                    <strong>{index + 1}.</strong>&nbsp;
                    {quizItem.question}
                    {cls1}
                </li>
                )                
            })
            }


                {/* <li>
                    <strong>1. </strong>
                    How are you?
                    <FontAwesomeIcon className={classes.error} style={{marginLeft: 10}} icon={faTimes}  />
                    {/* <i className={'fa fa-times' + classes.error} > </i> */}
                {/* </li>
                <li>
                    <strong>1. </strong>
                    How are you?
                    <FontAwesomeIcon className={classes.success} style={{marginLeft: 10}} icon={faCheck}/>
                </li> */}

            <p>Правильно {successCount} из {props.quiz.length}</p>
            
            <div>
                <Button onClick={props.retry} type="primary">Повторить</Button>
                <Link to='/'>
                    <Button onClick={props.retry} type="success">Перейти в список тестов</Button>
                </Link>
            </div>
            </ul>
        </div>
    )
}

export default FinishedQuiz