import userAPI from "../../apis/users";

export async function signin({id, password}) {
    let user = undefined
    await userAPI.login({
            user_id: id,
            user_pass: password
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