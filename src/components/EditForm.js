import React, { Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EditNote = styled.div`
    height: 100vh
`;

const Heading = styled.h2`
    margin-left: 5%;
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

const FormCard = styled.form`
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: ''
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateNote = event => {
        event.preventDefault();
        const updatedNote = {
            title: this.state.title,
            content: this.state.content
        }

        const token = localStorage.getItem('my_token');
        const options = {
            headers: {
                Authorization: token,
                'Content-type': 'application/json'
            }
        }

        axios
            .put(`https://backend-project-yanrong.herokuapp.com/api/notes/${this.props.match.params.id}`, updatedNote, options)
            .then(response => {
                console.log(response);
                this.setState({notes: response.data, updatedNote});
            })
            .catch(error => console.log(error))
            this.props.history.push('/')
    }

    render() {
        return (
            <EditNote>
                <FormCard>
                <Heading>Edit Note:</Heading>
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

                <Button onClick={this.updateNote}>Update</Button>
                </FormCard>
            </EditNote>
        )
    }
}

export default EditForm;