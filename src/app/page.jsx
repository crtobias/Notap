"use client"
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";

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
        <div>
            <form onSubmit={handleSubmit}>
                {error && <div>
                    {error}
                    </div>}
                <h1>NOTE-APP</h1>
                <h2>Signin</h2>
                <input type="email" placeholder="some@mail.com" name="email"/>
                <input type="password" placeholder="*******" name="password" />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}