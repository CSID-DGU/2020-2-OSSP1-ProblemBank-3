import React, {useState} from "react"
import {Redirect} from "react-router-dom"
import Form from "react-bootstrap/Form";
import "./style.scss"
import ManageTestLayout from "../../layouts/ManageTestLayout";
import Text from "../../components/DesignComponent/Text";

function LoginPage({auth, login, location}) {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        login({id, password})
        setId("")
        setPassword("")
    }

    function validateForm() {
        return id.length > 0 && password.length > 0;
    }

    const {from} = location.state || {from: {pathname: "/"}}
    if (auth) return <Redirect to={from}/>
    return (
        <div class="LoginPage">
            <div class="input">
                <Form onSubmit={handleLogin}>
                    <Form.Group size="lg">
                        <Form.Label>아이디</Form.Label>
                        <div>
                            <input
                                class="inputArea"
                                type="id"
                                size="15"
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <div class="margin"/>
                    <Form.Group size="lg">
                        <Form.Label>비밀번호</Form.Label>
                        <div>
                            <input
                                class="inputArea"
                                type="password"
                                size="15"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <button class="button" disabled={!validateForm()}> 로그인</button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage