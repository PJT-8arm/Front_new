import React, { createContext, useContext, useState } from 'react';
import { useMemberInfo } from '../../openapi/orval_query/api/member-controller/member-controller';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: user, refetch } = useMemberInfo();
    console.log(user);

    const logIn = () => {
        refetch();
    };

    const logOut = () => {
        // setUser(null); // setUser 함수가 필요하지 않을 것 같습니다.
        // 로그아웃 시 추가적인 처리가 필요하다면 여기에 작성합니다.
    };

    const setUser = () => {
        // setUser 함수의 구현 내용은 해당 애플리케이션의 로그인 상태를 변경하는 로직에 따라 달라집니다.
        // 예를 들어, 로그인 상태를 관리하는 상태 변수를 업데이트하거나, 쿠키를 삭제하는 등의 작업이 포함될 수 있습니다.
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
