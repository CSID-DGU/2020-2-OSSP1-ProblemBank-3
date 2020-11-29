import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import AdminTestResultPage from './pages/AdminTestResultPage';
import NotFound from '../../components/404NotFound';

function AdminTestResult() {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Switch>
            <Route exact path = {`${match.url}`} component = {AdminTestResultPage} />
        </Switch>
    )
}

export default AdminTestResult;

