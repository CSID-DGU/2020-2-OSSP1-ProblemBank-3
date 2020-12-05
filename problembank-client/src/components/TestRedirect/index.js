import React from "react"
import { Redirect } from "react-router-dom"

function TestPageRedirect( {user} ) {
    if (user.is_admin) return <Redirect to="/managetest" />
    else return <Redirect to="/test" />
}

export default TestPageRedirect