import userApi from "../../apis/users";
import {useState} from "react";

// 임시 디비 대용 사용자 정보
const users = [
    { id: "admin", password: "123", role: "ADMIN"},
    { id: "student", password: "123", role: "STUDENT"},
]

export function signin({ id, password }) {
    const params = {
        user_id: id,
        user_pass: password,
    };

    // userInfo 가져오기
    const response = userApi.getUserInfo(params);
    console.log(response.data)

    const user = response.data
    // const user = users.find(
    //     (user) => user.id === id && user.password === password
    // )
    // if (user === undefined) throw new Error()

    if (user === undefined) throw new Error();

    return user
}