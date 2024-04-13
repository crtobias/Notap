"use client"
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css"
import Link from 'next/link'


export default function LoginPage(){

    const [error,setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
            const res = await signIn("credentials",{
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
            })
            if(res?.error) return setError(res.error)
            if (res?.ok) return router.push("/tasks")
            // console.log('testlogin');
            // console.log(res);
    }


    return(
        <div className={styles.container}>
                <h1 className={styles.title}>NOTE-APP</h1>
            <form onSubmit={handleSubmit}  className={styles.form}>
                {error && <div>
                    {error}
                    </div>}
                <h2>Signin</h2>
                <input className={styles.input} type="email" placeholder="some@mail.com" name="email"/>
                <input className={styles.input} type="password" placeholder="*******" name="password" />
                <button className={styles.button}>
                    Login
                </button>
            </form>
            <p className={styles.new}>
            <Link href="/register">don't have account?</Link>
            </p>
        </div>
    )
}