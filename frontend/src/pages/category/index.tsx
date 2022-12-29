import styles from './style.module.scss'
import  Head  from 'next/head'

import { Header } from '../../components/Header'

import { FormEvent, useState } from 'react'

import {toast} from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth'; 

export default function Category(){
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            toast.error("Informe um nome para categoria");
            return;
        }

        const apiClient = setupAPIClient();
        apiClient.post('/category',{
            name: name
        })
        
        toast.success('Categoria cadastrada com sucesso!');
        setName('');
    }

    return(
        <>
            <Head>
                <title>Nova categoria - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastro de categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='Digite o nome da categoria'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button 
                            className={styles.buttonAdd}    
                            type='submit'
                        >
                            Cadastrar
                        </button>
                    </form>

                </main>
            </div>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{
    return{
        props:{

        }
    }
})