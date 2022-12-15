import { useContext, FormEvent } from "react";
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

 async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email: "teste@teste.com.br",
      password: "121212"
    }

    await signIn(data)
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
          />
           <Input
            placeholder="Sua senha"
            type="password"
          />
             <Button
            type="submit"
            loading={false}
          >
            Cadastrar
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
