import axios from 'axios';
import queryString from 'querystring';

console.log(process.env.REACT_APP_SERVER_API)

/*
    comuncation with axios at baseURL(REACT_APP_SERVER_API=http://localhost:3003)
    and only json file transaction not html (one page application: ajax?)
*/
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API,
    headers:{
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
    // { foo: 'bar', baz: ['qux', 'quux'], corge: '' } -> 'foo=bar&baz=qux&baz=quux&corge='
})

// handle token for request
// when requrest something, add token at header for authorization
axiosClient.interceptors.request.use(async(config) => {
        const token = localStorage.getItem("problem_bank");
        if(token)
        {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

// return data from all response
axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, error => {
    throw error;
})

export default axiosClient;



