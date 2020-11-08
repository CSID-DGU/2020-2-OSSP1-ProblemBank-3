import axiosClient from "./axios";

const projectAPI = {
    // compile source and run. after that, receive you score
    compile: (params) => {
        const url = '/projects/compile';
        return axiosClient.post(url, params );
    },
    // add problem to mylist
    addMyList: (params) => {
        const url = '/projects/addlist';
        return axiosClient.post(url, params)
    }
}

export default projectAPI;