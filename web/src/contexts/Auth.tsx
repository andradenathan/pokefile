import React, { 
    createContext, 
    useEffect, 
    useState 
} from "react";

interface IAuthProps {
    children: React.ReactNode;
}

interface IAuthContext {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    code: number;
    setCode: React.Dispatch<React.SetStateAction<number>>;
    signed: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = (props: IAuthProps) => {
    const [authorization, setAuthorization] = useState('');
    const [checkLogin, setCheckLogin] = useState(false);
    const [code, setCode] = useState<number>(0);

    const userToken = async() => {
        let token = '';
        try {
            const value = await localStorage.getItem('token');
            if(value !== null) token = 'Bearer ' + value;
        } catch(err: any) {
            return err.message;
        }

        if(token == 'Bearer ') token = '';
        return token;
    }

    const userCode = async() => {
        let code = 0;
        try {
            const value = await localStorage.getItem('code');
            if(value !== null) code = parseInt(value);
        } catch(err: any) {
            return err.message;
        }

        return code;
    }
    
    useEffect(() => {
        userToken().then(value => setAuthorization(value));        
        userCode().then(value => setCode(value));        
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
                    code: code,
                    setCode: setCode,
                    signed: checkLogin
                }}>
                    {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;