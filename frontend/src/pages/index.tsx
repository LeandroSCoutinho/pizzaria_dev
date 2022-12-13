import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoSvg from "../../public/logo.svg";
import { Input } from "../components/ui/Input";
import { Button } from '../components/ui/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria_Dev - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
       <Image src={logoSvg} alt="Logo Pizzaria_Dev"/>

       <div className={styles.login}>
        <form>
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
       </div>
      </div>
    </>
  )
}
