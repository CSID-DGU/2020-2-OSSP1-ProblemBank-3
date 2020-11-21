import axiosClient from "./axios";

const testAPI = {
    getAllTestData: (params) => {
        const url = '/tests/alltestdata';
        return axiosClient.get(url);
    },

    getTestProblems: (params) => {
        const url = '/tests/testproblems';
        return axiosClient.get(url, {params});
    },

    getTestProblemData: (params) => {
        const url = '/tests/testproblemdata';
        return axiosClient.get(url, {params});
    },

    getTestFeedback: (params) => {
        const url = '/tests/testfeedback';
        return axiosClient.get(url, {params});
    },

    getResultAdmin: (params) => {
        const url = '/tests/adminresult';
        return axiosClient.get(url, {params});
    },

    getResultUser: (params) => {
        const url = '/tests/userresult';
        return axiosClient.get(url, {params});
    },
}

export default testAPI;
