import styles from './style.module.scss'
import  Head  from 'next/head'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import { FiUpload } from 'react-icons/fi'

import { useState, ChangeEvent } from 'react'

import { setupAPIClient } from '../../services/api'

type ItemProps = {
    id: string;
    name: string;
}
interface CotegoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
          }
      
          const image = e.target.files[0];
      
          if(!image){
            return;
          }
      
          if(image.type === 'image/jpeg' || image.type === 'image/png'){
      
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      
          }
    }

    //Quando você seleciona uma nova categoria  na lista
    function handleChangeCategory(event){
        setCategorySelected(event.target.value);
    }
    return(
        <>
            <Head>
                <title>Novo produto - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input 
                                type='file'
                                accept='image/png, image/jpeg'
                                onChange={handleFile}
                            />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select  value={categorySelected} onChange={handleChangeCategory}>
                           {categories.map((item, index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                     {item.name}
                                    </option>
                                )
                           })}
                        </select>

                        <input 
                            type="text"
                            placeholder="Digite o nome do produto"
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input}
                        />

                        <textarea
                            className={styles.input}
                            placeholder="Descreva seu produto..."
                        ></textarea>

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

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    console.log(response.data);

    return {
        props:{
            categoryList: response.data
        }
    }
})