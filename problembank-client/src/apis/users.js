import axiosClient from "./axios";

const userAPI = {
    getUserInfo: (params) => {
        const url = '/users/userinfo';
        return axiosClient.get(url,{params});
    },
}

export default userAPI;
