"use client"
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";

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
        <div>
            <form onSubmit={handleSubmit}>
                {error && <div>
                    {error}
                    </div>}
                <h1>Signup</h1>
                <input type="text" placeholder="User" name="fullname"/>
                <input type="email" placeholder="some@mail.com" name="email"/>
                <input type="password" placeholder="*******" name="password" />
                <button>
                    register
                </button>
            </form>
        </div>
    )
}
