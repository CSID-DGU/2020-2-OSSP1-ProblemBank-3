import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import CreateTestPage from './pages/CreateTestPage';
import NotFound from '../../components/404NotFound';

function CreateTest() {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Switch>
            <Route exact path = {`${match.url}`} component = {CreateTestPage} />
        </Switch>
    )
}

export default CreateTest;

