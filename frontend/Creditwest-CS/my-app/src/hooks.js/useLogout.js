import React from 'react'
import useAuth from './useAuth';

const useLogout = () => {

    const { setAuth } = useAuth();

    const logout = () => {

        setAuth({});

        localStorage.clear('auth');
    }

    return logout;
}

export default useLogout
