"use client"
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import styles from "../../styles/registe.module.css"

export default function RegisterPage(){

    const [error,setError] = useState();
    const router = useRouter()



    const handleSubmit = async (e)=>{
        
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        

        try {
            const res =await axios.post('/api/auth/signup',{
                email: formData.get('email'),
                password: formData.get('password'),
                fullname: formData.get('fullname'),
            });
            const resNext = await signIn("credentials",{
                email: res.data.email,
                password: formData.get('password'),
                redirect: false,
            })
            if (resNext?.ok){
                return router.push("/")
            }

            console.log(res);
            
        } catch (error) {
            console.log(error);
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
            }
        }

    }

    return(
        <div className={styles.container}>
                <h1 className={styles.title}>Signup</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <div>
                    {error}
                    </div>}
                <input className={styles.input} type="text" placeholder="User" name="fullname"/>
                <input className={styles.input}  type="email" placeholder="some@mail.com" name="email"/>
                <input className={styles.input}  type="password" placeholder="*******" name="password" />
                <button className={styles.button} >
                    register
                </button>
            </form>
        </div>
    )
}
