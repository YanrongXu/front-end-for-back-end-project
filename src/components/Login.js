import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";
import bcrypt from 'bcryptjs';

const initalUser = {
    username: '',
    password: ''
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {...initalUser},
            message: ''
        }
    }

    inputHandler = event => {
        const { name, value } = event.target;
        this.setState({user: {...this.state.user, [name]: value}})
    }

    submitHandler = event => {
        event.preventDefault();
        axios.post(`https://backend-project-yanrong.herokuapp.com/api/login`, this.state.user)
            .then(res => {
                if(res.status === 200 && res.data) {
                    localStorage.setItem('my_token', res.data)
                    localStorage.setItem('my_username', this.state.user.username)
                    this.props.history.push('/notes')
                } else {
                    throw new Error()
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Authentication failed',
                    user: {...initalUser}
                })
            })
    }

    render() {
        return (
            <div className='login-page'>
            <a className='Signup' href='/signup'>Signup</a>
            <h1>Lambda Note</h1>
            <p>Login to see the Note</p>
                <form classname='login-form' onSubmit={this.submitHandler}>
                    <section>
                        <div>
                            <label htmlFor='username'>Username: </label>
                            <input
                                type='text'
                                placeholder='username'
                                id='username'
                                name='username'
                                value={this.state.user.username}
                                onChange={this.inputHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor='passowrd'>Password: </label>
                            <input
                                type='password'
                                placeholder='password'
                                id='password'
                                name='password'
                                value={this.state.user.password}
                                onChange={this.inputHandler}
                            />
                        </div>
                        <button className='login-button' type='submit'>Submit</button>
                    </section>
                </form>
                {this.state.message
                    ?(<h4>{this.state.message}</h4>)
                    : undefined
                }
            </div>
        )
    }
}