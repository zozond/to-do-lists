import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const color = "blue"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: false,
        password: false
    })

    let id = window.localStorage.getItem("userId");
    if(id != undefined || id != null) window.location.href = "/to-do-lists";

    return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color={color} textAlign='center'>
        Log-in to your account
      </Header>
      <Form 
        size='large' 
        onSubmit={() => {
            axios.get(`/user?email=${email}`)
            .then((res) => {
                let list = res.data
                if( list.length === 0){
                    //이메일이 없음
                    setError({
                        email: true,
                        password: true
                    })
                }else{
                    // 비교
                    let id = "";
                    let flag = false;
                    list.forEach((item) => {
                        if(email === item.email && password === item.password){
                            id = item.id;
                            flag = true;
                        }
                    })

                    if(flag){
                        window.localStorage.setItem("userId", id);
                        window.localStorage.setItem("userEmail", email);
                        window.location.href = "/to-do-lists"
                    }else{
                        setError({
                            email: false,
                            password: true
                        })
                    }
                    
                }
            }).catch((err) => {
                console.log(err)
                setError({
                    email: true,
                    password: false
                })
            })
        }}>
        <Segment stacked>
          <Form.Input 
            error={error.email}
            onChange={(event) => {
                setEmail(event.currentTarget.value)
            }}
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='E-mail address' />
          <Form.Input
            error={error.password}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(event) => {
                setPassword(event.currentTarget.value)
            }}
          />
          <Button color={color} fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/register'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)}

export default LoginForm