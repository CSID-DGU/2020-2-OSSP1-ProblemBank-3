import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import TotalProblemsPage from '../TotalProblems/pages/TotalProblemsPage';
import TestPage from './pages/TestPage';
import NotFound from '../../components/404NotFound';

function Test({role}) {
    const match = useRouteMatch();
    console.log(match.url);
    console.log(role);
    return (
        <Switch>
            {/* {role ==="STUDENT" && 
            <Route exact path = {`${match.url}`} component = {TestPage} />} */}
            <Route exact path = {`${match.url}`} component = {TestPage} />
            <Route exact path = {`${match.url}`} component = {NotFound} />
        </Switch>
    )
}

export default Test;

