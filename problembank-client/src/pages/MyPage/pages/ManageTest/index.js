import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import ManageTestPage from './pages/ManageTestPage';

function ManageTest({user}) {
    const match = useRouteMatch();
    console.log(match.url);
    if(user.is_admin) return (
        <Route exact path = {`${match.url}`} render={(props) => <ManageTestPage user={user} {...props}/>} />
    )
    else return <Redirect to="/" />
}

export default ManageTest;

