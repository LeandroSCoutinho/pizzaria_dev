import React, {useState, createContext, ReactNode, useEffect} from "react";
import { api } from "../services/api";

import  AsyncStorage  from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credential: SignInProps) => Promise<void>;
    loading: boolean;
    loadingAuth: boolean;
    singOut: () => Promise<void>;    
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
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false)
    const isAuthenticated = !!user.name;

    useEffect(()=>{

        async function getUser(){
            //Pegar os dados salvos do user
            const useInfo = await AsyncStorage.getItem('sujeitopizzaria');
            let hasUser: UserProps = JSON.parse(useInfo || '{}');
    
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
            
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false);

        }

        getUser();

    },[]);

    function signIn({email, password}: SignInProps){
        setLoadingAuth(true);
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
            setLoadingAuth(false);
        }
    }

    async function singOut(){
        await AsyncStorage.clear();

        setUser({
            id: '',
            name: '',
            email: '',
            token: ''
        });
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, loading, loadingAuth,singOut}}>
           {children}
        </AuthContext.Provider>
    )
}