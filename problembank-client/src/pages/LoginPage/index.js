import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginPage.css";

function LoginPage({ auth, login, location }) {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        login({ id, password })
        setId("")
        setPassword("")
    }

    function validateForm() {
        return id.length > 0 && password.length > 0;
    }

    const { from } = location.state || { from: { pathname: "/" } }
    if (auth) return <Redirect to={from} />
    return (
            <div className="Login">
                <Form onSubmit={handleLogin}>
                    <Form.Group size="lg" controlId="id">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            autoFocus
                            type="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            autoFocus
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form>
            </div>
    )
}

export default LoginPage