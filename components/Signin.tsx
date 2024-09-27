'use client'
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import React, { useRef } from "react"
import { signIn } from "next-auth/react"

const Signin = () => {
    const email = useRef('');
    const password = useRef('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        email.current = value;
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        password.current = value;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            email: email.current,
            password: password.current
        })
        if (res?.error) {
            // Redirect to error page with error message
            window.location.href = `/auth/error?error=${res.error}`;
        }
    }
    const router = useRouter()
    return (
        <div className="bg-black flex justify-center items-center min-h-screen">
            <div className="bg-gray-700 rounded p-8 w-96 h-96 m-2">
                <div className="flex flex-col text-xl text-white">
                    <h1 className="text-white font-sans text-2xl md:text-4xl font-semibold text-center p-8">SignIn</h1>
                    <div className="text-left pt-2">
                        <label className="">Email:</label>
                        <Input type="email" placeholder="abc@example.com" onChange={handleEmailChange} />
                    </div>
                    {/* <div className="flex space-x-2">
                        <Label>PhoneNumber:</Label>
                        <Input type="number" placeholder="please enter phone number" onChange={handlePhoneChange}/>
                    </div> */}
                    <div className=" py-4">
                        <label>Password:</label>
                        <Input type="password" placeholder="enter password" onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" onClick={handleSubmit} className=" bg-blue-600 transition-transform duration-500 delay-200 hover:scale-110 ease-in-out rounded-md p-2">SignIn</button>
                </div>
            </div>

        </div>
    )
}

export default Signin