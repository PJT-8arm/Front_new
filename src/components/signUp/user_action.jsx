import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance'; // AXIOS_INSTANCE 대신에 axiosInstance를 가져옵니다.

import {
    LOGIN_USER,
    REGISTER_USER,
} from './types';

export function loginUser(dataToSubmit) {

    const request = axiosInstance.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axiosInstance.post('/api/members/join', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    };
}