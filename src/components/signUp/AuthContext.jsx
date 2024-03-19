import React, { createContext, useContext, useState } from 'react';
import { useMemberInfo } from '../../openapi/orval_query/api/member-controller/member-controller';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {data : user, refetch} = useMemberInfo();
    console.log(user);
    const logIn = (userData) => {
        refetch()
    };

    const logOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
