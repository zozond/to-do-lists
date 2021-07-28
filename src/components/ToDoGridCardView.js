import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Grid, Header, Button, Icon } from 'semantic-ui-react'
import ToDoCard from './ToDoCard';

const getToday = () => {
  let today = new Date();
  let month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)
  let result = today.getFullYear() + "-" + month + "-" + today.getDate();
  return result;
}

const ToDoGridCardView = (disable) => {
    const [ list, setList ] = useState([]);

      useEffect(() => {
        axios.get(`/database?_sort=id&_order=desc`).then((res) => {
          setList(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, [])

    return (
      <div style={{width: "100%"}}>
        <Header as='h2' textAlign='center' style={{margin: "16px"}}>
          To Do Lists Card Views
        </Header>
        <Grid container columns={1} centered>
          <Button icon onClick={ () => {
            // check 
            let today = getToday();
            let isContained = false;
            list.forEach((item) => {
              if(item.date === today){
                isContained = true
              }
            })

            //if not contain
            if(isContained === false){
              // {
              //   "date": "2021-07-27",
              //   "list": [
              //     {
              //       "label": "공부 하기",
              //       "checked": true
              //     }
              //   ],
              //   "id": 2
              // }
              let data = {}
              data.date = today;
              data.list = []

              axios.post(`/database`, data)
              .then(() => {
                window.location.href = "/to-do-lists"
              }).catch((err) => {
                console.log(err)
              })
            }
          }}>
            <Icon size="large" name="plus"></Icon>
          </Button>
        </Grid>
        <Grid container columns={4} >
          {
            list.map((item, index) => {
              let id = item.id;
              return <Grid.Column key={id}> <ToDoCard item={item}/> </Grid.Column>
            })
          }
        </Grid>
    </div>
)}

export default ToDoGridCardView