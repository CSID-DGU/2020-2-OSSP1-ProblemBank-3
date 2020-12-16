import React from "react"
import {Redirect, Route, useRouteMatch, Switch} from "react-router-dom"
import Sidebar from "../../components/Sidebar/mypage";
import MyTestResults from "./pages/MyTestResults";
import MyTests from "./pages/MyTests";
import ManageTest from "./pages/ManageTest";
import AdminTestResult from "./pages/AdminTestResult"
import CreateTest from "./pages/CreateTest"

import './style.scss';

function MyPage( {user} ) {
    const match = useRouteMatch();

    return (
        <div className="container-mypage">
            <Sidebar user = {user}/>

            <Switch>
                <Route exact path = {`${match.url}`} render={(props) => <MyTestResults user={user} {...props}/>} />
                <Route exact path = {`${match.url}/apply`} render={(props) => <MyTests user={user} {...props}/>} />
                <Route exact path = {`${match.url}/adminresults`} render={(props) => <AdminTestResult user={user} {...props}/>} />
                <Route exact path = {`${match.url}/manage`} render={(props) => <ManageTest user={user} {...props}/>} />
                <Route exact path = {`${match.url}/create`} render={(props) => <CreateTest user={user} {...props}/>} />
            </Switch>
        </div>
    );
}

export default MyPage