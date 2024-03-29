import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMemberInfo } from '../../openapi/orval_query/api/member-controller/member-controller';
import { axiosInstance } from '../../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUserInfo = async () => {
        const response = await axiosInstance({
            url: '/api/members/info',
            method: 'get'
        }).then(response => {
            console.log(response);
            if (response) setUser(response);
        })
    };

    useEffect(()=>{console.log(user)},[user]);

    const logIn = async () => {
        getUserInfo();
    };

    const logOut = () => {
        setUser(null);
        axiosInstance({
            url: '/api/membres/logout',
            method: 'post'
        })
        // 로그아웃 시 추가적인 처리가 필요하다면 여기에 작성합니다.
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);