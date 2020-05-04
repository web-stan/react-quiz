import React from 'react'
import classes from './MenuToggle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'



const MenuToggle = props => {

    const cls = [
        classes.MenuToggle,
    ]

    if (props.isOpen) {
        cls.push(classes.open)
    }

    return (
                <FontAwesomeIcon 
                onClick={props.onToggle} 
                className={cls.join(' ')} 
                icon={props.isOpen ? faTimes : faBars}
                />
    )
}

export default MenuToggle