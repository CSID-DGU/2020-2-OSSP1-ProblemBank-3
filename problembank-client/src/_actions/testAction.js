import testAPI from '../apis/tests'
import {
    GET_USER_RESULTS,
    GET_USER_TESTS,
} from './types.js'

export async function getUserTest(user_id){
    const request = testAPI.getUserTests({user_id: user_id})
    return {
        type: GET_USER_TESTS,
        payload: request
    }
}

export async function getUserResult(user_id){
    const request = testAPI.getResultUser({user_id: user_id})
    return {
        type: GET_USER_RESULTS,
        payload: request
    }
}