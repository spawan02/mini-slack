"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
// import { useTheme } from 'next-themes'
import { LogIn } from 'lucide-react'
import HeroSection from './HeroSection'
import Navigation from './Navigation'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { feature } from '@/constants/Feature'
import FeatureCard from './FeatureCard'
import { signIn } from 'next-auth/react'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)
  const handleSubmit = () => {
    // router.push("/api/auth/signin")
    signIn()
  }
  return (
    <div >
      <Navigation />
      <div className="min-h-screen items-center justify-center flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-white text-white dark:text-gray-900 transition-colors duration-500">
        <HeroSection />
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleSubmit}
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 sm:py-4 py-2 rounded-full font-semibold text-base sm:text-lg shadow-lg transition-all duration-300"
          >
            <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Sign In
          </Button>
          <motion.div
            className="absolute -inset-0.5 opacity-75 cursor-pointer"
            initial={false}
            animate={{ opacity: isHovered ? 0.85 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          className=''
        >

        </motion.div>

        <motion.div
          className="mt-12 flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        </motion.div>
        <div>
          <motion.div
            className='grid grid-col-1 gap-4 m-2  md:grid-cols-3 md:gap-8 mt-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {feature.map((feature, index) => {
              return (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
              )
            })}
          </motion.div>
        </div>

      </div>
    </div>
  )
}