"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
const page = () => {
    const [token, setToken] = useState<string>("")

    const verify = async () => {
        try {
            await axios.post("api/users/verify", {
                token: token
            })
            toast(' User verified!', {
                icon: '👏',
            });
        } catch (err: any) {
            console.log(err)
            toast.error("User already verified")

        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken)
    }, [])

    useEffect(() => {
        if (token) {
            verify()
        }

    }, [token])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Account Verification
                </h1>

            </main>
        </div>

    )
}

export default page