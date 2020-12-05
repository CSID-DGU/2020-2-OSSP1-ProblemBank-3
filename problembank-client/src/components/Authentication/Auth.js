import axiosClient from "../../apis/axios";

export async function signin({id, password}) {
    let user = undefined
    await axiosClient.get('http://localhost:3003/users/userinfo', {
        params: {
            user_id: id,
            user_pass: password
        }
    })
        .then(function (response) {
            console.log(response.data)
            user = response.data
        })
        .catch(function (error) {
            console.log(error);
        });

    return user

}