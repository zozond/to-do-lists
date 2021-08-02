import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Input, List, Label, Grid } from 'semantic-ui-react'
import utils from '../utils'

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

const ToDoCard = ({item, recordData, disable}) =>  {
    const [ record, setRecord ] = useState(recordData)
    const [ id, setId ] = useState(0)
    const [ list, setList ] = useState([]);
    const [ date, setDate ] = useState("");
    const [ day, setDay ] = useState("");
    const [ openToDoInput, setOpenToDoInput ] = useState(true);
    const [standAlone, setStandAlone] = useState(false);
    useEffect( () => {
        if(item === undefined){
            setStandAlone(true);
            let id = window.localStorage.getItem("userId");
            if(id == undefined || id == null) window.location.href = "/";

            axios.get(`/database`).then((res) => {
                console.log(res.data)
                let dbLists = res.data
                dbLists.map((db_data) => {
                    if(db_data.userId == id){
                        setRecord(db_data)
                        let dataLists = db_data.data;
                        let index = window.location.pathname.lastIndexOf('/')
                        let dateForDB = window.location.pathname.substring(index+1)
                        dataLists.map((item) => {
                            if(item.date == dateForDB){
                                let toDoLists = item.list;
                                let date = item.date;
                                let currentDate = new Date(date)
                                let id = item.id;
                                setId(id)
                                setList(toDoLists)
                                setDate(date)
                                setDay(convertKoreanDate(currentDate.getDay()));
                            }
                        })
                    }
                })
            })
            // axios.get(`/database?_sort=id&_order=desc`)
            //     .then((res) => {
            //   let idx = window.location.pathname.lastIndexOf("/")
            //   let date = window.location.pathname.substring(idx+1);
            //   let toDoLists = res.data
            //   toDoLists.forEach((item) => {
            //     if( item.date === date){
            //         let behaviors = item.list;
            //         let date = item.date;
            //         let currentDate = new Date(date)
            //         let id = item.id;
            //         setId(id);
            //         setList(behaviors)
            //         setDate(date)
            //         setDay(convertKoreanDate(currentDate.getDay()));
            //     }
            //   })
            // }).catch((err) => {
            //   console.log(err)
            // })
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
      let databaseId = record.id
      let newRecord = record;

      let data = {}
      data.list = newList;
      data.date = date;

      newRecord.data.map((item) => {
        if(item.date === date){
            item.list = newList
        }
      })

      axios.patch(`/database/${databaseId}`, newRecord)
      .then((res) => {
        console.log(res)
        // window.location.href = "/to-do-lists"
      }).catch((err) => {
        console.log(err)
      })

    //   axios.put(`/database/${id}`, data)
    //     .then((res)=> {
    //       console.log(res)
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
    }

    return (
    <Card centered style={{margin: "20px"}}>
        { standAlone ? <Button onClick={() => {window.location.href = "/to-do-lists"}}>리스트로</Button>: <></> }
        <Card.Content>
        <Card.Header> 
            <Link to={`/to-do-lists/${date}`}> {date} </Link> 
        </Card.Header>
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
                                <Button 
                                    disabled = {utils.isDisabled(date)}
                                    as='div' 
                                    labelPosition='right' 
                                    onClick={() => {
                                        let newItem = {
                                            label: text,
                                            checked: !check
                                        }
                                        let newList = list.slice(0, index).concat(newItem, list.slice(index+1, list.length))
                                        setList(newList);
                                        update(newList);
                                    }}>
                                    <Button 
                                    color="blue"
                                    disabled = {utils.isDisabled(date)}
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
                                    disabled = {utils.isDisabled(date)}
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
                openToDoInput ?  
                    <></> 
                    : 
                    <Input
                    placeholder="Enter를 입력하면 등록됩니다."
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
                <Button 
                    disabled = {utils.isDisabled(date)}
                    icon 
                    onClick={() => {
                    setOpenToDoInput(!openToDoInput);
                }}>
                    { openToDoInput ? <Icon name='plus' /> : <Icon name='close' /> }
                </Button>
            </div>
        </Card.Content>
    </Card>
)}

export default ToDoCard