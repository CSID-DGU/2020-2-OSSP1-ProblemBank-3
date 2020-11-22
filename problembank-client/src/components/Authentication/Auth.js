import userApi from "../../apis/users";
import { getUserInfo } from '../../_actions/userAction';

// 임시 디비 대용 사용자 정보
const users = [
    { id: "admin", password: "123", role: "ADMIN"},
    { id: "student", password: "123", role: "STUDENT"},
]

export function signin({ id, password }) {

    const user = users.find(
        (user) => user.id === id && user.password === password
    )

    // let user2
    // getUserInfo(id, password).then(response => {
    //     const { data } = response.payload
    //     setUser(data)
    // })
    if (user === undefined) throw new Error()
    return user
}