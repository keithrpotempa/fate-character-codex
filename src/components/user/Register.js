import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import ApiManager from '../../modules/ApiManager';

// Layout Theme:
// https://react.semantic-ui.com/layouts/login

// NOTE: THIS IS NOT TRUE AUTHENTICATION
// It is storing clear text credentials in session storage

const Register = props => {
  const [credentials, setCredentials] = useState({ email: "", fname: "", lname: "" });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    ApiManager.getUserByEmail(credentials.email)
      .then(resp => {
        if (resp.length !== 0) {
          confirmAlert({
            title: 'Invalid',
            message: "Email address is already in use",
            buttons: [
              {
                label: 'Ok',
                onClick: null
              }
            ]
          });
        } else {
          const user = {...credentials}
          ApiManager.post("users", user)
            .then(resp => props.setUser(resp))
            .then(props.history.push("/"))
        }
      })
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Register your account
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input 
              id="email"
              fluid icon='mail' 
              iconPosition='left' 
              placeholder='E-mail address'
              onChange={handleFieldChange} 
            />
            <Form.Input 
              id="fname"
              fluid icon='user' 
              iconPosition='left' 
              placeholder='First Name'
              onChange={handleFieldChange} 
            />
            <Form.Input 
              id="lname"
              fluid icon='user outline' 
              iconPosition='left' 
              placeholder='Last Name'
              onChange={handleFieldChange} 
            />
            {/* <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            /> */}

            <Button color='teal' fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='/login'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register