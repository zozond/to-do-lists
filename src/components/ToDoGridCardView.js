import React, { useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import ToDoCard from './ToDoCard';


const ToDoGridCardView = (disable) => {
    const [ list, setList ] = useState([
      {
        "id" : 1,
        "date": "2021-07-26",
        "list" : []
      }, 
      {
        "id" : 2,
        "date": "2021-07-25",
        "list" : [
          { 
            label: "치과가기",
            checked: true
          }
        ]
      },
      {
        "id" : 3,
        "date": "2021-07-24",
        "list" : [
          { 
            label: "등본 뽑기",
            checked: false
          },
          { 
            label: "설거지",
            checked: true
          }
        ]
      }
      ,
      {
        "id" : 4,
        "date": "2021-07-23",
        "list" : []
      }, 
      
      {
        "id" : 5,
        "date": "2021-07-22",
        "list" : [
          { 
            label: "밥 사주기",
            checked: false
          },
          { 
            label: "고기 사오기",
            checked: false
          },
          { 
            label: "공부하기",
            checked: false
          },
        ]
      },
      {
        "id" : 6,
        "date": "2021-07-21",
        "list" : [
          { 
            label: "고양이 보러가기",
            checked: false
          },
          { 
            label: "공부하기",
            checked: false
          },
        ]
      },
      {
        "id" : 7,
        "date": "2021-07-20",
        "list" : [
          { 
            label: "일하기",
            checked: false
          }
        ]
      }]);

    return (
      <div style={{width: "100%"}}>
      <Header as='h2' textAlign='center' style={{margin: "16px"}}>
        To Do Lists Card Views
      </Header>
      {/* <div style={{display: "flex", justifyContent: "center"}}> */}
        <Grid container columns={4} >
          {
            list.map((item, index) => {
              let id = item.id;
              // return <Grid.Column > <ToDoCard id={id} date={date} toDoLists={list}/> </Grid.Column>
              console.log(item)
              return <Grid.Column key={id}> <ToDoCard item={item}/> </Grid.Column>
            })
          }
        </Grid>
      {/* </div> */}
    </div>
)}

export default ToDoGridCardView