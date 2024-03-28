import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance'; // AXIOS_INSTANCE 대신에 axiosInstance를 가져옵니다.

import {
    LOGIN_USER,
    REGISTER_USER,
} from './types';

export function loginUser(dataToSubmit) {

    const request = await axiosInstance({
        method: 'post',
        url: '/api/users/login',
        data: dataToSubmit
    });

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = await axiosInstance({
        method: 'post',
        url: '/api/members/join',
        data: dataToSubmit
    });


    return {
        type: REGISTER_USER,
        payload: request
    };
}