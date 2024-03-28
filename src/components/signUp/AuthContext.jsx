import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMemberInfo } from '../../openapi/orval_query/api/member-controller/member-controller';
import { axiosInstance } from '../../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { data: userInfo, refetch } = useMemberInfo();
    console.log(user);

    useEffect(() => {
        if (userInfo) {
            setUser(userInfo);
        }
    }, [userInfo]);

    const logIn = async () => {
        await refetch();
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