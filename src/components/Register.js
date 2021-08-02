import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const color = "blue"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState({
        email: false,
        password: false
    })
    return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color={color} textAlign='center'>
        Register
      </Header>
      <Form 
        size='large' 
        onSubmit={() => {
            axios.get(`/user?email=${email}`)
            .then((res) => {
                let list = res.data
                if( list.length === 0){
                    if(password !== passwordConfirm){
                        //이메일이 없음
                        setError({
                            email: false,
                            password: true
                        })
                        return;
                    }

                    let data = {}
                    data.email = email;
                    data.password = password
                    
                    axios.post(`/user`, data)
                        .then((res) => {
                            console.log(res.data)
                            let db_data = {
                                userId: res.data.id,
                                data : []
                            }
                            axios.post(`/database`, db_data).then(() => { window.location.href = "/"; }).catch((err) => { console.log(err) })
                        }).catch((err) => {
                            console.log(err)
                        })
                }else{
                    setError({
                        email: true,
                        password: false
                    })
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
          <Form.Input
            error={error.password}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password Confirm'
            type='password'
            onChange={(event) => {
                setPasswordConfirm(event.currentTarget.value)
            }}
          />
          <Button color={color} fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)}

export default Register