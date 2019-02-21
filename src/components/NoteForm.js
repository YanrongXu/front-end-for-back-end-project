import React, { Component }from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AddNote = styled.div`
    height: 100vh
`;
const Heading = styled.h2`
    margin-left: 5%;
`;

const FormCard = styled.form`
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.input`
    width: 60%;
    height: 30px;
`;

const Text = styled.textarea`
    width: 95%;
    height: 300px;
`;

const Button = styled.button`
    margin-top: 2%;
    width: 20%;
    height: 40px;
    background: #2AC0C4;
    color: white;
`;

const username = localStorage.getItem('my_username')

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            username: username
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    addNote = event => {
        event.preventDefault();
        const newNote = {
          title: this.state.title,
          content: this.state.content,
          username: username
        };

        const token = localStorage.getItem('my_token');
        
        const options = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        axios
            .post('https://backend-project-yanrong.herokuapp.com/api/postnotes', newNote, options)
            .then(response => {
                this.setState({notes: response.data, newNote})
                this.props.history.push('/')
            })
            .catch(error => console.log(error))
            this.props.history.push('/')
    }

    

    render() {
        return (
            <AddNote>
                <Heading>Create New Note:</Heading>
                <FormCard onSubmit={this.addNote}>
                    <Title
                        name='title'
                        placeholder='Note Title'
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                    <Text
                        name='content'
                        placeholder='Note Content'
                        value={this.state.content}
                        onChange={this.handleInputChange}
                    />
                    <Button type='submit'>Save</Button>
                </FormCard>
        </AddNote>
        )
    }
}

export default NoteForm;