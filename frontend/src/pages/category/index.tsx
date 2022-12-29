import styles from './style.module.scss'
import  Head  from 'next/head'

import { Header } from '../../components/Header'

import { FormEvent, useState } from 'react'

import {toast} from 'react-toastify';

export default function Category(){
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        toast.success(`${name} cadastrado com sucesso!`)
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