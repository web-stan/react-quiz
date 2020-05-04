import React from 'react'
import classes from './AnswerList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList = props => {
    // console.log(props.state);
  
    return ( 
        <ul className={classes.AnswerList}>
            {
                props.answers.map((answer, index) => {
                    
                    return (
                        <AnswerItem 
                        onAnswerClick = {props.onAnswerClick}
                        key ={index}
                        answer = {answer}
                        state = {props.state ? props.state[answer.id] : null}
                        // state = {props.state ? props.state : null}

                        >
                        </AnswerItem>
                    )
                }) 
            }
        </ul>
    )
}

export default AnswerList
