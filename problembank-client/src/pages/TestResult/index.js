import React from 'react'
import {Route, useRouteMatch} from 'react-router-dom';
import DetailedResultPage from './pages/DetailedResultPage';

function DetailedResult(props) {
    const {user} = props
    const match = useRouteMatch();
    console.log(match.url);
    return (
        <Route exact path = {`${match.url}`} render={(props) => <DetailedResultPage user={user} {...props}/>} />
        )
}

export default DetailedResult;

