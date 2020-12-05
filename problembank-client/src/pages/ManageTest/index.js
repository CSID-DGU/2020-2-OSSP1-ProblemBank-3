import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import ManageTestPage from './pages/ManageTestPage';
import NotFound from '../../components/404NotFound';

function ManageTest({user}) {
    const match = useRouteMatch();
    console.log(match.url);
    if(user.is_admin) return (
        <Switch>
            <Route exact path = {`${match.url}`} component = {ManageTestPage} />
        </Switch>
    )
    else return <Redirect to="/test" />
}

export default ManageTest;

