import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ManageTestPage from './pages/ManageTestPage';
import NotFound from '../../components/404NotFound';

function ManageTest() {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Switch>
            <Route exact path = {`${match.url}`} component = {ManageTestPage} />
        </Switch>
    )
}

export default ManageTest;

