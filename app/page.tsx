"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Code, Cloud, Lock, Zap, Globe, Shield, GitCommit, Star, ArrowRight, Users, BarChart } from "lucide-react"


const automatedTexts = ['Automated', 'Simplified', 'Optimized', 'Streamlined']

export type Project = {
    id: string
    name: string
    subdomain: string
    gitUrl: string
    branch: string
}


const services = [
    { icon: <Code className="w-12 h-12" />, title: "Developer Tools", description: "Cutting-edge tools to streamline your development process and boost productivity." },
    { icon: <Cloud className="w-12 h-12" />, title: "Cloud Infrastructure", description: "Scalable and reliable cloud solutions to power your applications with ease." },
    { icon: <Lock className="w-12 h-12" />, title: "Security", description: "Advanced security measures to protect your data and ensure peace of mind." },
    { icon: <Zap className="w-12 h-12" />, title: "Performance", description: "Optimize your applications for lightning-fast performance and responsiveness." },
    { icon: <Globe className="w-12 h-12" />, title: "Global CDN", description: "Deliver content quickly to users worldwide with our extensive CDN network." },
    { icon: <Shield className="w-12 h-12" />, title: "DDoS Protection", description: "Robust protection against DDoS attacks to keep your services running smoothly." },
]

const stats = [
    { icon: <Users className="w-8 h-8" />, value: "10M+", label: "Active Users" },
    { icon: <Cloud className="w-8 h-8" />, value: "99.99%", label: "Uptime" },
    { icon: <Globe className="w-8 h-8" />, value: "190+", label: "Countries Served" },
    { icon: <BarChart className="w-8 h-8" />, value: "500B+", label: "API Requests/Month" },
]

export default function HomePage() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [projects, setProjects] = useState<Project[]>([])

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-jobs`);
            const data = await res.json();
            console.log(data)
            setProjects(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(projects);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % automatedTexts.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="min-h-screen bg-gray-900 text-white">
            <main>
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 opacity-50"></div>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.h1
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="text-5xl md:text-7xl font-bold mb-4 text-center"
                        >
                            Revolutionize Your Development
                        </motion.h1>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            className="text-3xl md:text-5xl font-semibold mb-8 text-center"
                        >
                            Everything is{" "}
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentTextIndex}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                >
                                    {automatedTexts[currentTextIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                            className="text-xl mb-12 text-center max-w-3xl mx-auto"
                        >
                            Empower your development with cutting-edge tools and infrastructure. Build, scale, and
                            secure faster than ever before.
                        </motion.p>
                        <div className="flex justify-center space-x-6">
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.8, delay: 0.6}}
                            >
                                <Link href="/projects"
                                      className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                                    View Projects
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.8, delay: 0.6}}
                            >
                                <button
                                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    Get Started
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: index * 0.1}}
                                    className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                                >
                                    <div
                                        className="flex justify-center mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4 text-center group-hover:text-purple-300 transition-colors duration-300">{service.title}</h3>
                                    <p className="text-gray-300 text-center">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: index * 0.1}}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                                >
                                    <div className="flex justify-center mb-4 text-purple-400">{stat.icon}</div>
                                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                                    <p className="text-gray-400">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-20">
                    <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: index * 0.1}}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-700"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                                            {project.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold truncate text-lg">{project.name}</h3>
                                            <p className="text-sm text-gray-400 truncate">https://{project.subdomain}.psa-khmer.world</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm mb-4 line-clamp-2 text-gray-300">{project.gitUrl}</p>
                                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                    <div className="flex items-center">
                                        <GitCommit size={16} className="mr-1 flex-shrink-0"/>
                                        <span>{project.branch}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Star size={16} className="mr-1 flex-shrink-0 text-yellow-400"/>
                                    </div>
                                </div>
                                <Link href={`/project/${project.name}`}
                                      className="mt-4 text-purple-400 hover:text-purple-300 flex items-center justify-end group">
                                    View Details
                                    <ChevronRight size={16}
                                                  className="ml-1 transform group-hover:translate-x-1 transition-transform"/>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                                <p className="text-xl text-gray-300 mb-6">Join thousands of developers who are already using our platform to build amazing things.</p>
                                <Link href="/signup" className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 inline-flex items-center group">
                                    Sign Up Now
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <div className="md:w-1/2">
                                <img src="/placeholder.svg?height=300&width=400" alt="Get Started" className="rounded-lg shadow-2xl" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    )
}