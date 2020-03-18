import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

// Layout Theme:
// https://react.semantic-ui.com/layouts/login

// NOTE: THIS IS NOT TRUE AUTHENTICATION
// It is storing clear text credentials in session storage

const LoginForm = props => {
  const [credentials, setCredentials] = useState({ email: ""});

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    props.setUser(credentials);
    props.history.push("/");
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input 
              id="email"
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'
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
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm