import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header} from '../../components/Header'
import Head from 'next/head'

export default function Dashboard(){
  return(
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header/>
        
        <h1>Bem vindo ao painel</h1>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})