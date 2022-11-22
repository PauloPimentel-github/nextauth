import styles from '../styles/Home.module.scss'

import { GetServerSideProps } from 'next';

import { FormEvent, useState } from 'react';
import { parseCookies } from 'nookies';

import { useAuth } from '../context/AuthContext';

export default function Home () {

 const { signIn } = useAuth();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent){
    event.preventDefault()

   const data = {
    email,
    password
   }
   
   await signIn(data);
 }

  return (
   <form onSubmit={handleSubmit} className={styles.form}>
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
     <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

     <button type="submit">Enviar</button>
   </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  
  if (cookies['nextauth.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}