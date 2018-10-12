import React, {Component} from 'react';
import axios from 'axios'

const initialUser = {
    username: '',
    passowrd: ''
}

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {...initialUser},
            message: ''
        }
    }

    inputHandle = event => {
        const { name, value } = event.target;
        this.setState({user: {...this.state.user, [name]: value}})
    }

    submitHandler = event => {
        event.preventDefault();
        axios.post(`https://backend-project-yanrong.herokuapp.com/api/register`, this.state.user)
            .then(res => {
                if(res.status === 201) {
                    this.setState({
                        message: 'Registration Successful',
                        user: {...initialUser}
                    })
                    this.props.history.push('/')
                } else {
                    throw new Error()
                }
            })
            .catch(err => {
                this.setState({
                    message: 'Registration failed',
                    user: {...initialUser}
                })
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <section>
                        <h1>SignUp</h1>
                    </section>
                    <section>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={this.state.user.username}
                                onChange={this.inputHandle}
                            />
                        </div>
                        <div>
                            <label htmlFor='passowrd'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={this.state.user.passowrd}
                                onChange={this.inputHandle}
                            />
                        </div>
                        <button type='submit'>Submit</button>
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