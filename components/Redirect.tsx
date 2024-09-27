"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Redirect = ({ to }: { to: string }) => {
    const router = useRouter();
    useEffect(() => {
        router.push(to)

    }, [])
    return (
        <div>
        </div>
    )
}

export default Redirect