import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DeleteModal from './DeleteModal'
import bcrypt from 'bcryptjs';


const ViewContainer = styled.div`
    height: 100vh;
    background-image: url('https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
`;

const ViewNav = styled.div`
`;

const Button = styled.button`
    width: 70px;
`;

const ButtonContent = styled.div`
display: flex;
flex-direction: row;
`;

const ViewNote = styled.div`
`;


export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            id: '',
            title: '',
            content: ''
        }
    }

    authenticate = () => {
        const token = localStorage.getItem('my_token');
        const myusername = localStorage.getItem('my_username');
        const postUsername = {
            username: myusername
        }
        const options = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        const id = this.props.match.params.id;

        if(token) {
            axios.post(`https://backend-project-yanrong.herokuapp.com/api/notes/${id}`,postUsername, options)
                .then(res => {
                    console.log(res.data)
                    if(res.status === 200 && res.data) {
                        console.log(res)
                        this.setState({loggedIn: true, id: res.data.id, title: res.data.title, content: res.data.content})
                    } else {
                        throw new Error()
                    }
                })
                .catch(err => {
                    this.props.history.push('/login')
                })
        } else {
            this.props.history.push('/login')
        }
    }


    handleDelete = () => {
        const token = localStorage.getItem('my_token');
        const options = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        const id = this.props.match.params.id;

        if(token) {
            axios.delete(`https://backend-project-yanrong.herokuapp.com/api/notes/${id}`, options)
                .then(res => {
                    console.log(res.data)
                    if(res.status === 200 ) {
                        console.log(res)
                        this.props.history.push('/notes')
                    } else {
                        throw new Error()
                    }
                })
                .catch(err => {
                    this.props.history.push('/login')
                })
        } else {
            this.props.history.push('/login')
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        this.props.history.push(`edit/${id}`)
    }

    componentDidMount() {
        this.authenticate()
    }

    componentDidUpdate(prevProps) {
        const {pathname} = this.props.location;
        if(pathname === '/' && pathname !== prevProps.location.pathname) {
            this.authenticate();
        }
    }


    render() {
        return (
            <ViewContainer>
                <ViewNav>
                    <ButtonContent>
                    <Button onClick={this.handleUpdate}>edit</Button>
                    </ButtonContent>
                    <DeleteModal 
                        {...this.props}
                        handleDelete={this.handleDelete}
                    />
                </ViewNav>

                <ViewNote>
                    <h3>Title: {this.state.title}</h3>
                    <p>Content: {this.state.content}</p>
                </ViewNote>
            </ViewContainer>
        )
    }
}