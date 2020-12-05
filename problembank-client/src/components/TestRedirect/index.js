import React from "react"
import { Redirect } from "react-router-dom"

function TestPageRedirect( {user} ) {
    console.log("redirect");
    console.log(user);


    console.log(user.is_admin);
    if (user.is_admin) return <Redirect to="/managetest" />
    else return <Redirect to="/test" />
}

export default TestPageRedirect