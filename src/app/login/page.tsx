"use client";

import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession, signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session } = useSession()
    const router = useRouter()

    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState("");


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsloading(true)
        try {
            const { data } = await axios.post("/api/auth/login", {
                email, password
            })
            if (data.success) {
                signIn("credentials", {
                    email, password
                })
                router.push("/")
            } setError(data.message)
        } catch (error) {
            const res = error as Error
            setError(res.message)
        } finally {
            setIsloading(false)
        }
    }
    return (
        <section className='grid place-content-center h-screen'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-500'>
                <h1 className='text-xl font-bold my-4'>Login</h1>

                <form className='flex flex-col gap-3' onSubmit={onSubmit}>
                    <input
                        className='w-[400px] border border-gray-200 py-2 px-4 bg-zinc-100/40 font-normal'
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='w-[400px] border border-gray-200 py-2 px-4 bg-zinc-100/40'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2' disabled={isloading}>
                        {isloading ? "Loading..." : "Register"}
                    </button>

                    <div className='flex items-center'>
                        <div className='flex w-full h-[1px] bg-sky-600'></div>
                        <p className='text-sm mb-1 px-4'>or</p>
                        <div className='w-full h-[1px] bg-sky-600'></div>
                    </div>
                </form>
                <div className='flex flex-col gap-3'>
                    <button onClick={() => signIn("google")} className='bg-transparent text-black border hover:bg-gray-300 transition duration-200 py-3 px-5 rounded-full text-sm w-full flex items-center justify-center gap-3'>
                        <FcGoogle className='text-2xl' />
                        Sign in with google
                    </button>
                    <button onClick={() => signIn("github")} className='bg-transparent text-black border hover:bg-gray-300 transition duration-200 py-3 px-5 rounded-full text-sm w-full flex items-center justify-center gap-3'>
                        <FaGithub className='text-2xl' />
                        Sign in with Github
                    </button>

                </div>

                {error && <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error}
                </div>}

                <Link className='text-sm mt-3 text-right flex items-center justify-end' href={` /register`}>
                    Don't have an account?
                    <span className='underline'>
                        Register
                    </span>
                </Link>
            </div>
        </section>
    )
}

export default LoginPage