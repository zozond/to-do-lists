import React, { Component } from 'react';
import ToDoCard from './components/ToDoCard';
import ToDoGridCardView from './components/ToDoGridCardView';
import { Route, Redirect, Switch } from 'react-router-dom';

const getToday = () => {
    let today = new Date();
    let month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)
    let result = today.getFullYear() + "-" + month + "-" + today.getDate();
    return result;
}

class MyRouter extends Component {
    render() {
        let today = getToday();
        return (
          <Switch>
            <Route path="/" exact >
                <Redirect to={`/to-do-lists`} />
            </Route>
            <Route path={`/to-do-lists`} exact component={ToDoGridCardView} />
            <Route path={`/to-do-lists/:date`} exact component={ToDoCard} />

            {/* 404 Error Page / Redirect Page */}
            <Route path='*'> 
                <Redirect to={`/to-do-lists/${today}`} />
            </Route>
          </Switch>
        );
    }
}

export default MyRouter;