import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const deploySteps = [
    'Initializing deployment...',
    'Fetching source...',
    'Installing dependencies...',
    'Building project...',
    'Optimizing assets...',
    'Deploying to edge network...',
    'Running post-deployment checks...',
    'Deployment successful!',
]

export default function TerminalLog() {
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % deploySteps.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black bg-opacity-75 p-6 rounded-lg shadow-2xl max-w-2xl w-full"
            >
                <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-sm text-green-400">
                    {deploySteps.slice(0, currentStep + 1).map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            $ {step}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}