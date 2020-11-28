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

    getTestTimes: (params) => {
        const url = '/tests/testtimes';
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
// 이하 개발중, 테스트안됨
    getUserTests: (params) => {
        const url = '/tests/usertests';
        return axiosClient.get(url, {params});
    },

    createTest: (params) => {
        const url = '/tests/createtest';
        return axiosClient.get(url, params);
    },

    testRun: (params) => {
        const url = '/tests/testrun';
        return axiosClient.post(url, params);
    },

    submit: (params) => {
        const url = '/tests/submit';
        return axiosClient.post(url, params);
    },
}

export default testAPI;
