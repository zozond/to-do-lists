import React, { Component } from 'react';
import LoginForm from './components/LogIn';
import Register from './components/Register';
import ToDoCard from './components/ToDoCard';
import ToDoGridCardView from './components/ToDoGridCardView';
import { Route, Redirect, Switch } from 'react-router-dom';

class MyRouter extends Component {
    render() {
        return (
          <Switch>
            <Route path="/" component={LoginForm}  exact  />
            <Route path="/register" component={Register}  exact  />
            {/* <Route path="/" exact >
                <Redirect to={`/to-do-lists`} />
            </Route> */}
            <Route path={`/to-do-lists`} exact component={ToDoGridCardView} />
            <Route path={`/to-do-lists/:date`} exact component={ToDoCard} />

            {/* 404 Error Page / Redirect Page */}
            <Route path='*'> 
                <Redirect to={`/to-do-lists`} />
            </Route>
          </Switch>
        );
    }
}

export default MyRouter;