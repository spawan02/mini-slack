import React from 'react'
import { motion } from 'framer-motion'
interface FeatureProps {
    icon: any,
    title: String,
    description: string
}

const FeatureCard = ({ icon: IconComponent, title, description }: FeatureProps) => {
    return (

        <motion.div
            className='bg-gray-700 p-6 md:p-16 rounded-lg border border-gray-800 duration-300'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <IconComponent />
            <h1 className='text-xl font-semibold mt-4 mb-2 text-blue-400'>{title}</h1>
            <p className='text-gray-400'>{description}</p>
        </motion.div>

    )
}

export default FeatureCard