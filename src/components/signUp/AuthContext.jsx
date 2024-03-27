import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMemberInfo } from '../../openapi/orval_query/api/member-controller/member-controller';

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
        // 로그아웃 시 추가적인 처리가 필요하다면 여기에 작성합니다.
    };

    return (
<<<<<<< HEAD
        <AuthContext.Provider value={{ user, logIn, logOut, setUser }}>
=======
        <AuthContext.Provider value={{ user, logIn, logOut }}>
>>>>>>> main
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);