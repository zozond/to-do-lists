import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Input, List, Label } from 'semantic-ui-react'

const sample = [
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
    }];

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

const ToDoCard = ({item, disable}) => {
    const [ list, setList ] = useState([]);
    const [ date, setDate ] = useState("");
    const [ day, setDay ] = useState("");
    const [ openToDoInput, setOpenToDoInput ] = useState(true);

    useEffect(() => {
        if(item === undefined){
            let flag = false;
            let idx = window.location.pathname.lastIndexOf("/")
            let date = window.location.pathname.substring(idx+1);

            sample.forEach((item) => {
                if( item.date === date){
                    flag = true;
                    let toDoLists = item.list;
                    let date = item.date;
                    let currentDate = new Date(date)
                    setList(toDoLists)
                    setDate(date)
                    setDay(convertKoreanDate(currentDate.getDay()));
                }
            })

            if(flag == false){
                window.location.href = "/to-do-lists"
            }
        }else{
            let toDoLists = item.list;
            let date = item.date;
            let currentDate = new Date(date)
            setList(toDoLists)
            setDate(date)
            setDay(convertKoreanDate(currentDate.getDay()));
        }
        
    }, []);

    return (
  <Card>
    <Card.Content>
      <Card.Header> <Link to={`/to-do-list/${date}`}> {date} </Link> </Card.Header>
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
                                    setList(list.slice(0, index).concat(list.slice(index+1, list.length)));
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