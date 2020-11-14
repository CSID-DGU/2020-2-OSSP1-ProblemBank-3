
// 임시 디비 대용 사용자 정보
const users = [
    { id: "admin", password: "123", role: "ADMIN"},
    { id: "student", password: "123", role: "STUDENT"},
]

export function signin({ id, password }) {
    const user = users.find(
        (user) => user.id === id && user.password === password
    )
    if (user === undefined) throw new Error()
    return user
}