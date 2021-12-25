import Axios, { AxiosResponse, Method } from 'axios';
import { isDevMode } from '@angular/core';
const BASE_URL = isDevMode()
    ? '//localhost:3030/api/' 
    : '/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data?) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint:string, method:Method = 'GET', data = null) {
    try {
        console.log('data', data);
        console.log(`${BASE_URL}${endpoint}`);
        
        
        const res= await axios(
            {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            // window.location.assign('/')
        }
        throw err
    }
}