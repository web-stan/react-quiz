import React from 'react';
import classes from './Input.module.css';

const Input = props => {

    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType} - ${Math.random()}`

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                id={htmlFor}
                value={props.value}
                type={inputType}
                onChange={props.onChange}
            />

            {
                props.errorMessage
                ? <span>{props.errorMessage}</span>
                : null
            }
            
            
        </div>

    )
}

export default Input