import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import TotalProblemsPage from '../TotalProblems/pages/TotalProblemsPage';
import TestPage from './pages/TestPage';
import DoTest from './pages/DoTest';
import NotFound from '../../components/404NotFound';
import AdminTestProgress from '../AdminTestProgressPage/'

function Test({user}) {
    const match = useRouteMatch();
    console.log(match.url);

    return (
    <Switch>
        <Route path = {`${match.url}/adminprogress`} render={(props) => <AdminTestProgress user={user} {...props} /> } />
        <Route exact path = {`${match.url}/view`} render={(props) => <DoTest user={user} {...props} /> } />
        <Route exact path = {`${match.url}`} render={(props) => <TestPage user={user} {...props} /> } />
        {/* <Route exact path = {`${match.url}`} component = {NotFound} /> */}
    </Switch>);

    // if(!user.is_admin) return (
    //     <Switch>
    //         <Route exact path = {`${match.url}/view`} render={(props) => <DoTest user={user} {...props} /> } />
    //         <Route exact path = {`${match.url}`} render={(props) => <TestPage user={user} {...props} /> } />
    //         {/* <Route exact path = {`${match.url}`} component = {NotFound} /> */}
    //     </Switch>
    // )
    // else return <Redirect to="/test/admin"/>
}

export default Test;

