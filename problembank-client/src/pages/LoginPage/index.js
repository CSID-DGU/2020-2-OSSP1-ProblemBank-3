import React, { useState } from "react"
import { Redirect } from "react-router-dom"

function LoginPage({ auth, login, location }) {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {
        try {
            login({ id, password })
        } catch (e) {
            alert("로그인 실패")
            setId("")
            setPassword("")
        }
    }

    const { from } = location.state || { from: { pathname: "/" } }
    if (auth) return <Redirect to={from} />
    return (
        <>
            <h1>Login</h1>
            <input
                value={id}
                onChange={({ target: { value } }) => setId(value)}
                type="text"
                placeholder="id"
            />
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                // change to password for censoring
                type="text"
                placeholder="password"
            />
            <button onClick={handleClick}>Login</button>
        </>
    )
}

export default LoginPage