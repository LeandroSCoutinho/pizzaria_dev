
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function handleSinUp(event:FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);
  
 }
  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>

        <form onSubmit={handleSinUp}>
          <Input
            placeholder="Digite seu nome"
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />

          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Cadastrar
          </Button>
        </form>

        <Link href="/"  legacyBehavior>
           <a className={styles.text}> Já possui uma conta? Faça login! </a>
        </Link>


      </div>
    </div>
    </>
  )
}

