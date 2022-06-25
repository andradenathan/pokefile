import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface IAuthProps {
    children: React.ReactNode;
}

interface IAuthContext {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    signed: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = (props: IAuthProps) => {
    const [authorization, setAuthorization] = useState('');
    const [checkLogin, setCheckLogin] = useState(false);

    const userToken = async() => {
        let token = '';
        try {
            const value = await AsyncStorage.getItem('token');
            if(value !== null) token = 'Bearer ' + value;
        } catch(err: any) {
            return err.message;
        }

        return token;
    }
    
    useEffect(() => {
        userToken().then(value => setAuthorization(value));        
    });

    const checkIfUserIsAuthorized = (): void => {
        if(authorization !== '') setCheckLogin(true);
        else setCheckLogin(false); 
    }

    useEffect(() => {
        checkIfUserIsAuthorized();
    }, [authorization, checkLogin]);

    return (
        <AuthContext.Provider 
            value={{
                    token: authorization, 
                    setToken: setAuthorization, 
                    signed: checkLogin
                }}>
                    {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;