import React from 'react'
import {Route, useRouteMatch} from 'react-router-dom';
import DetailedResultPage from './pages/DetailedResultPage';


import './style.scss';

function DetailedResult(props) {
    const {user} = props
    const match = useRouteMatch();
    // console.log(match.url);
    return (
        <div className="container-mypage">
            <Route exact path = {`${match.url}`} render={(props) => <DetailedResultPage user={user} {...props}/>} />
        </div>
        )
}

export default DetailedResult;

