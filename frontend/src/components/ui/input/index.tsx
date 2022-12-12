import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import  styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...res}:InputProps){
    return(
        <input className={styles.input} {...res}/>
    )
}

export function TextArea({...res}){
    return(
        <textarea className={styles.input} {...res}></textarea>
    )
}