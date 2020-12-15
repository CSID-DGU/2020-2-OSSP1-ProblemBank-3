import React from "react"
import { Redirect } from "react-router-dom"

function TestPageRedirect( {user} ) {
    if (user.is_admin) return <Redirect to="/test/admin" />
    else return <Redirect to="/test/student" />
}

export default TestPageRedirect