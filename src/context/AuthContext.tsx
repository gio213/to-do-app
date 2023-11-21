"use client"
import React, { useContext , createContext, useState} from "react";


type AuthContextType = {
    isLogin:boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const authContext = createContext({} as AuthContextType )

const AuthContext = () => {
    return useContext(authContext)
}

const AuthContextWrapper = ({children}: {children:JSX.Element}) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <authContext.Provider value={{isLogin, setIsLogin}}>
            {children}
        </authContext.Provider>
    )
}

export {AuthContext, AuthContextWrapper}