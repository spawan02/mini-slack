'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, LogIn } from 'lucide-react'
import HeroSection from './HeroSection'
import Navigation from './Navigation'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { feature } from '@/constants/Feature'
import FeatureCard from './FeatureCard'


export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const handleSubmit = () => {
    router.push("/api/auth/signin")
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
        {/* <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              fill="currentColor"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,64L48,96C96,128,192,192,288,213.3C384,235,480,213,576,202.7C672,192,768,192,864,213.3C960,235,1056,277,1152,266.7C1248,256,1344,192,1392,160L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,32L48,74.7C96,117,192,203,288,234.7C384,267,480,245,576,234.7C672,224,768,224,864,213.3C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 20,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div> */}
      </div>
    </div>
  )
}