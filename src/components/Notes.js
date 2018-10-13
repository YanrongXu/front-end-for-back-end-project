import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotesContainer = styled.div`
`;

 const Heading = styled.h2`
  display: flex;
  margin-left: 30px;
`;

 const NotesDisplay = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

 const NoteCard = styled.div`
  border: 1px solid gray;
  width: 225px;
  height: 200px;
  margin-left: 60px;
  margin-top: 30px;
`;

 const NoteTitle = styled.h3`
  border-bottom: 1px solid gray;
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: black;
`;

 const NoteBody = styled.p`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: gray;
`;


export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            notes: []
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

        if(token) {
            axios.post('https://backend-project-yanrong.herokuapp.com/api/notes',postUsername, options)
                .then(res => {
                    console.log(res.data)
                    if(res.status === 200 && res.data) {
                        this.setState({loggedIn: true, notes: res.data})
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

    componentDidMount() {
        this.authenticate()
    }

    componentDidUpdate(prevProps) {
        const {pathname} = this.props.location;
        if(pathname === '/' && pathname !== prevProps.location.pathname) {
            this.authenticate();
        }
    }

    logout = () => {
        localStorage.removeItem('my_token')
        localStorage.removeItem('my_username')
        this.props.history.push('/login')
    }

    render() {
        return (
            <NotesContainer>
                <Heading>Your Notes:</Heading>
                <NotesDisplay>
                    {this.state.notes.map(note => {
                        return (
                            <Link to={`/note/${note.id}`} style={{textDecoration: 'none'}}>
                            <NoteCard
                                key={note.id}
                            >
                                <NoteTitle>
                                    {note.title.length >= 15
                                        ? note.title.substring(0, 15)+'...'
                                        : note.title
                                    }
                                </NoteTitle>
                                <NoteBody>
                                    {note.content.length >= 100
                                        ? note.content.substring(0, 100)+'...'
                                        :note.content
                                    }
                                </NoteBody>
                            </NoteCard>
                            </Link>
                        )
                    })}
                </NotesDisplay>
            </NotesContainer>
        )
    }
}