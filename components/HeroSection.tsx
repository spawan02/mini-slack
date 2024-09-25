import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <div className="items-center max-w-xl">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold mb-6">Welcome to NeoSlack</h1>
                <p className="text-xl mb-8">The future of team communication is here.</p>
            </motion.div>
        </div>
    )
}

export default HeroSection;