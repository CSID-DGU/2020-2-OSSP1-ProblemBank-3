import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import CreateTestPage from './pages/CreateTestPage';
import ModifyListPage from './pages/ModifyListPage';
import NotFound from '../../components/404NotFound';

function CreateTest() {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Switch>
            <Route exact path = {`${match.url}`} component = {CreateTestPage} />
	    <Route exact path = {`${match.url}/modifylist`} component = {ModifyListPage} />
        </Switch>
    )
}

export default CreateTest;

