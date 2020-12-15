import React from "react"
import {Redirect, Route, useRouteMatch} from "react-router-dom"
import MyPagePage from "./pages/MyPagePage";

function MyPage( {user} ) {
    const match = useRouteMatch();
    return (
        <Route exact path = {`${match.url}`} render={(props) => <MyPagePage user={user} {...props}/>} />
    )
}

export default MyPage