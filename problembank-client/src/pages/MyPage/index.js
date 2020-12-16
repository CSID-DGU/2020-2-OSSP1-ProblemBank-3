import React from "react"
import {Redirect, Route, useRouteMatch, Switch} from "react-router-dom"
import Sidebar from "../../components/Sidebar/mypage";
import MyPagePage from "./pages/MyPagePage";

function MyPage( {user} ) {
    const match = useRouteMatch();
    return (<div>

        <Sidebar user = {user}/>
        <Switch>
            {/* <Route exact path = {`${match.url}`} render={(props) => <MyPagePage user={user} {...props}/>} /> */}
        </Switch>
    </div>
        
    )
}

export default MyPage