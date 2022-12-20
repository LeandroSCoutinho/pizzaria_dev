import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoSvg from "../../public/logo.svg";
import { Input } from "../components/ui/Input";
import { Button } from '../components/ui/Button';
import Link from "next/link";

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
 const { signIn } = useContext(AuthContext);

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const [loading, setLoading] = useState(false);

 async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      alert("Preecha os dados");
      return;
    }

    setLoading(true);

    let data = {
      email: email,
      password: password
    }

    await signIn(data);

    setLoading(false);
 }
  return (
    <>
      <Head>
        <title>Pizzaria_Dev - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
       <Image src={logoSvg} alt="Logo Pizzaria_Dev"/>

       <div className={styles.login}>
        <form onSubmit={handleLogin}>
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
            Acessar
          </Button>
        </form>

        <Link href="/signup" legacyBehavior>
          <a className={styles.text}> Nao possui uma conta? Cadastre-se</a>
        </Link>

       </div>
      </div>
    </>
  )
}
