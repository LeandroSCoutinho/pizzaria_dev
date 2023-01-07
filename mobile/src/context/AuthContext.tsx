import React, {useState, createContext, ReactNode} from "react";
import { api } from "../services/api";

import  AsyncStorage  from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credential: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string;    
}
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name:'',
        email: '',
        token: ''
    })
    const [loading, setLoading] = useState(false)
    const isAuthenticated = !!user.name;

    function signIn({email, password}: SignInProps){
        setLoading(true);
        try {
           const response = await api.post('/session',{
            email,
            password
           })

           const {id, name, token } = response.data;

           const data = {
            ...response.data
           }

           await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

           api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
           setUser({
            id,
            name,
            email,
            token
           });
           
        } catch (err) {
            console.log('erro ao acessar', err)
            setLoading(false);
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
           {children}
        </AuthContext.Provider>
    )
}