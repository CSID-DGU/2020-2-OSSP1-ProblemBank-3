import userAPI from '../apis/users'
import {
    GET_USER_INFO
}from './types.js'

export async function getUserInfo(){
    const request = userAPI.getUserInfo()
    return {
        type: GET_USER_INFO,
        payload: request
    }
}