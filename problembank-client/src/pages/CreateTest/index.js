import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import CreateTestPage from './pages/CreateTestPage';
import ModifyListPage from './pages/ModifyListPage';
import NotFound from '../../components/404NotFound';

function CreateTest() {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <div className="create-page-container" style={{marginLeft: '20px', marginTop: '20px'}}>
            <Switch>
            <Route exact path = {`${match.url}`} component = {CreateTestPage} />
            <Route exact path = {`${match.url}/modifylist`} component = {ModifyListPage} />
            </Switch>
        </div>
        
    )
}

export default CreateTest;

