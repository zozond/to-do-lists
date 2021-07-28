import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Input, List, Label } from 'semantic-ui-react'


const convertKoreanDate = (currentDate) => {
    let day = "";
    switch (currentDate) {
        case 0:
            day = "일요일";
            break;
        case 1:
            day = "월요일";
            break;
        case 2:
            day = "화요일";
            break;
        case 3:
            day = "수요일";
            break;
        case 4:
            day = "목요일";
            break;
        case 5:
            day = "금요일";
            break;
        case 6:
            day = "토요일";
            break;
        default:
            day = "";
            break;
      }
      return day;
}

const ToDoCard = ({item, disable}) =>  {
    const [ id, setId ] = useState(0)
    const [ list, setList ] = useState([]);
    const [ date, setDate ] = useState("");
    const [ day, setDay ] = useState("");
    const [ openToDoInput, setOpenToDoInput ] = useState(true);

    useEffect( () => {
        if(item === undefined){
            axios.get(`/database?_sort=id&_order=desc`)
            .then((res) => {
              let idx = window.location.pathname.lastIndexOf("/")
              let date = window.location.pathname.substring(idx+1);
              let toDoLists = res.data
              toDoLists.forEach((item) => {
                if( item.date === date){
                    let behaviors = item.list;
                    let date = item.date;
                    let currentDate = new Date(date)
                    let id = item.id;
                    setId(id);
                    setList(behaviors)
                    setDate(date)
                    setDay(convertKoreanDate(currentDate.getDay()));
                }
              })
            }).catch((err) => {
              console.log(err)
            })
        }else{
            let toDoLists = item.list;
            let date = item.date;
            let currentDate = new Date(date)
            let id = item.id;
            setId(id)
            setList(toDoLists)
            setDate(date)
            setDay(convertKoreanDate(currentDate.getDay()));
        }
        
    }, []);

    const update = (newList) => {
      let data = {}
      data.id = id;
      data.list = newList;
      data.date = date;
      axios.put(`/database/${id}`, data)
        .then((res)=> {
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
    }

    return (
  <Card>
    <Card.Content>
      <Card.Header> <Link to={`/to-do-lists/${date}`}> {date} </Link> </Card.Header>
      <Card.Meta>
        <span className='date'> {day} </span>
      </Card.Meta>
      <Card.Description>
        할 일 {list.length} 개 남음
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <List>
        {
            list.map((item, index) => {
                let check = item.checked
                let text = item.label
                return <List.Item key={day + "_" + index}>
                        <div style={{display: "flex", justifyContent: "space-between", width:"100%"}}>
                            <Button as='div' labelPosition='right' onClick={() => {
                                    let newItem = {
                                        label: text,
                                        checked: !check
                                    }
                                    setList(list.slice(0, index).concat(newItem, list.slice(index+1, list.length)));
                                }}>
                                <Button 
                                color="blue"
                                basic
                                icon
                                >
                                    {
                                        check ? <Icon size="large" name="check circle outline"></Icon> : <Icon size="large" name="circle outline"></Icon>
                                    }
                                </Button>
                                <Label as='a' color={check? "grey" : "blue"} basic pointing='left'>
                                    {text}
                                </Label>
                            </Button>
                            <Button 
                                icon
                                onClick={() => {
                                    let newList = list.slice(0, index).concat(list.slice(index+1, list.length))
                                    setList(newList);
                                    update(newList);
                                }}>
                                <Icon size="large" name='trash alternate' />
                            </Button>
                        </div>
                    </List.Item> 
            })
        }
        </List>

        {
            openToDoInput ?  <></> : <Input
                style={{width: "100%"}}
                onKeyUp={(event) => {
                    if(event.key === 'Enter'){
                        list.push({label: event.target.value, checked: false})
                        setList(list)
                        setOpenToDoInput(!openToDoInput);
                        update(list);
                    }
                }}
                />
        }

        <div style={{width: "100%", display: "flex", justifyContent:"center"}}>
            <Button icon onClick={() => {
                setOpenToDoInput(!openToDoInput);
            }}>
                { openToDoInput ? <Icon name='plus' /> : <Icon name='close' /> }
            </Button>
        </div>
    </Card.Content>
  </Card>
)}

export default ToDoCard