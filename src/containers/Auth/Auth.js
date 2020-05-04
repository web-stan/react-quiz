import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
// import axios from 'axios';
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'


function validateEmail(email) {
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {     
                email: {
                    value: '',
                    type: 'c',
                    errorMessage: '',
                    label: 'email',
                    valid: false
                },
                password: {
                    value: '',
                    type: 'password',
                    errorMessage: '',
                    label: 'Пароль',
                    valid: false
                },
        }
    }

    
    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true)

        // const authData= {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }

        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8i-6oxv97BjCiEbiQfymKXbOyt8e1hCo', authData)
        //     console.log(response.data)
        // } catch(err) {
        //     console.log(err)
        // }
    
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false)

        // const authData= {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }

        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8i-6oxv97BjCiEbiQfymKXbOyt8e1hCo', authData)
        //     console.log(response.data)
        // } catch(err) {
        //     console.log(err)
        // }
    }



    submitHandler(event) {
        event.preventDefault();
    }

    onChange = (event, inputName) => {
        const valueInput = event.target.value.trim()

        const formControls = { ...this.state.formControls }
        const inputKind = { ...formControls[inputName] }

        inputKind.value = valueInput

        if (inputName === 'email') {
            if (validateEmail(valueInput)) {
                inputKind.errorMessage = ''
                inputKind.valid = true
            }  else {
                inputKind.errorMessage = `Введите верный ${inputName}`
                inputKind.valid = false
            }
        }

        if (inputName === 'password') {
            if (Number(valueInput) && valueInput.length > 5) {
                inputKind.errorMessage = ''
                inputKind.valid = true
            } else {
                inputKind.errorMessage = `Введите верный ${inputName}`
                inputKind.valid = false
            } 
        }

        formControls[inputName] = inputKind

        let isFormValid = true

        // eslint-disable-next-line
        Object.keys(formControls).map(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            isFormValid, formControls 
        })
    }


    renderInputs () {
        return Object.keys(this.state.formControls).map((inputName, key) => {
            const input = this.state.formControls[inputName];

            return (
                <Input 
                    key={key}
                    label={input.label}
                    type={input.type}
                    value={input.value}
                    errorMessage={input.errorMessage}
                    onChange={event => this.onChange(event, inputName)}
                />
            )
        })
    }
    
    render() {
        return (
            <div className={classes.Auth}>

                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        {this.renderInputs()}

                        <Button 
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                            >
                            Войти
                        </Button>

                        <Button 
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                            >
                            Зарегестрироваться
                        </Button>
                    </form>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)