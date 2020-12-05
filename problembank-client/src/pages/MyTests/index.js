import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import MyTestsPage from './pages/MyTestsPage';

function MyTests({user}) {
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Switch>
            <Route exact path = {`${match.url}`} render={(props) => <MyTestsPage user={user} {...props}/>} />
        </Switch>
    )
}

export default MyTests;

