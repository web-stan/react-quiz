import React, { Component } from 'react';
import classes from './Drawer.module.css';
import BackDrops from '../../UI/BackDrops/BackDrops';
import { NavLink } from 'react-router-dom'

// const links = [
//     {
//         to: '/',
//         label: 'Список',
//         exact: true
//     },
//     {
//         to: '/auth',
//         label: 'Авторизация',
//         exact: false
//     },
//     {
//         to: '/quiz-creator',
//         label: 'Создать тест',
//         exact: false
//     }

// ]

class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
            <li key={index}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.props.dropsHandlerClose}
                >{link.label}
                </NavLink>
            </li>
            )
        })
    }

    render () {

        console.log('auth', this.props.isAuthenticated )

        let links =  [
            {to: '/', label: 'Список', exact: true}
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false},
                        {to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
            {this.props.isOpen 
            ? <BackDrops  dropsHandlerClose={this.props.dropsHandlerClose} />
            : null
            }
            </React.Fragment>
            )
    }
        
}

export default Drawer