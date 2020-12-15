import axiosClient from "./axios";

const testAPI = {
    getAllTestData: (params) => {
        const url = '/tests/alltestdata';
        return axiosClient.get(url, {params});
    },

    getAdminTestList: (params) => {
        const url = '/tests/admintestlist';
        return axiosClient.get(url, {params});
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

    getUserAnswers: (params) => {
        const url = '/tests/useranswer';
        return axiosClient.get(url, {params});
    },

    getUserTests: (params) => {
        const url = '/tests/usertests';
        return axiosClient.get(url, {params});
    },

    createTest: (params) => {
        const url = '/tests/createtest';
        return axiosClient.post(url, params);
    },

    updateTest: (params) => {
        const url = '/tests/updatetest';
        return axiosClient.post(url, params)
    },

    updateProblem: (params) => {
        const url = '/tests/updateproblem';
        return axiosClient.post(url, params)
    },

    regTest: (params) => {
        const url = '/tests/regtest';
        return axiosClient.post(url, params);
    },

    cancelReg: (params) => {
        const url = '/tests/cancelreg';
        return axiosClient.post(url, params);
    },

    testRun: (params) => {
        const url = '/tests/testrun';
        return axiosClient.post(url, params);
    },

    submit: (params) => {
        const url = '/tests/submit';
        return axiosClient.post(url, params);
    },

    reportError: (params) => {
        const url = '/tests/reporterror';
        return axiosClient.post(url, params);
    }
}

export default testAPI;
