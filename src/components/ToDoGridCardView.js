import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Grid, Header, Button, Icon } from 'semantic-ui-react'
import ToDoCard from './ToDoCard';
import utils from '../utils'


const ToDoGridCardView = (disable) => {
    const [ list, setList ] = useState([]);
    const [databaseId, setDatabaseId] = useState(0);
    const [ record, setRecord] = useState({});
      useEffect(() => {
        let id = window.localStorage.getItem("userId");
        if(id == undefined || id == null) window.location.href = "/";

        axios.get(`/database`).then((res) => {
          let dbLists = res.data
          dbLists.map((item) => {
            if(item.userId == id){
              setRecord(item);
              setDatabaseId(item.id)
              let user_ToDoLists = item.data;
              user_ToDoLists.sort((a, b) => {
                if(a.date > b.date){
                  return -1;
                }else if(a.date < b.date){
                  return 1;
                }else{
                  return 0;
                }
              })
              setList(user_ToDoLists)
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      }, [])

    return (
      <div style={{width: "100%"}}>
        <Header as='h2' textAlign='center' style={{margin: "16px"}}>
          To Do Lists Card Views
        </Header>
        <Grid  >
          <Grid.Column floated='right' width={5}>
            <Button icon onClick={ () => {
              // check 
              let today = utils.getToday();
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
                // }
                let updateData = record;
                let data = {}
                data.date = today;
                data.list = []
                updateData.data.push(data)
                
                axios.patch(`/database/${databaseId}`, updateData)
                .then(() => {
                  window.location.href = "/to-do-lists"
                }).catch((err) => {
                  console.log(err)
                })
              }
            }}>
              <Icon name="plus"> </Icon>
            </Button>
            <Button onClick={() => {
              window.localStorage.removeItem("userId");
              window.location.href = "/"
            }}>
              Logout
            </Button>
          </Grid.Column>
        </Grid>
        <Grid container columns={4} >
          {
            list.map((item, index) => {
              return <Grid.Column key={index}> <ToDoCard recordData={record} item={item}/> </Grid.Column>
            })
          }
        </Grid>
    </div>
)}

export default ToDoGridCardView