import axiosClient from './axios'

const problemsBank = {
    getCategory: (params) => {
        const url = '/problems/getcategory';
        return axiosClient.get(url, { params });
    },
    getProblemsBankByCategoryID: (params) => {
        const url = '/problems/category';
        return axiosClient.get(url, { params });
    },
    // get all problem
    getProblemAllData: (params) => {
        const url = '/problems/problemsdata';
        return axiosClient.get(url);
    },
    // information of a problem
    getProblemInformation: (params) => {
        const url = '/problems/getproblemsinfor';
        return axiosClient.get(url);
    },
    // set problem to mylist.
    // question: what difference is it with projects.addMylist ?
    ProblemToMyList: (params) => {
        const url = '/problems/problemtomylist';
        return axiosClient.post(url, params);
    },
    // get  from mylistproblem
    getProblemFromMyList: (params) => {
        const url = '/problems/getmyproblems';
        return axiosClient.get(url);
    }
}

export default problemsBank;