import axiosClient from "./axios";

const userAPI = {
    login: (params) => {
        const url = '/users/login';
        return axiosClient.get(url,{params});
    },
    getUserInfo: (params) => {
        const url = '/users/userinfo';
        return axiosClient.get(url);
    },
}

export default userAPI;
