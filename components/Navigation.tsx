"use client"

import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
const Navigation = () => {
    const router = useRouter()
    const handleSubmit = () => {
        router.push("/signin")
    }
    return (
        <div className="bg-gray-900">
            <nav className="container mx-auto py-6 px-4 flex justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-bold text-blue-400">NeoSlack</h1>
                </motion.div>
                <motion.button
                    className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                >
                    Get Started
                </motion.button>
            </nav>
        </div>

    )
}

export default Navigation