'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Plus, Menu, ChevronRight, Star, GitCommit } from 'lucide-react'

interface Project {
    id: string
    name: string
    domain: string
    lastCommit: string
    lastCommitTime: string
    deploymentStatus?: number
    stars: number
}

const projects: Project[] = [
    {
        id: '1',
        name: 'nextjs-supabase-integration',
        domain: 'nextjs-supabase-integration.vercel.app',
        lastCommit: 'Initial commit Created from https://vercel.com/new',
        lastCommitTime: '2h ago',
        stars: 24
    },
    {
        id: '2',
        name: 'jonmeyers-io',
        domain: 'jonmeyers.io',
        lastCommit: 'fix white background on mobile refresh',
        lastCommitTime: '5d ago',
        deploymentStatus: 99,
        stars: 132
    },
    {
        id: '3',
        name: 'private-file-server',
        domain: 'private-file-server.vercel.app',
        lastCommit: 'entire app',
        lastCommitTime: '47d ago',
        stars: 57
    },
]

export default function Home() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const automatedTexts = ['Automated', 'Simplified', 'Optimized', 'Streamlined']

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % automatedTexts.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-black"></div>
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <span className="font-semibold hidden sm:inline">jonathondmeyers</span>
                            <span className="px-2 py-1 text-xs bg-gray-200 rounded-full hidden sm:inline">Hobby</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/feedback" className="text-gray-700 hover:text-gray-900">Feedback</Link>
                        <Link href="/changelog" className="text-gray-700 hover:text-gray-900">Changelog</Link>
                        <Link href="/support" className="text-gray-700 hover:text-gray-900">Support</Link>
                        <Link href="/docs" className="text-gray-700 hover:text-gray-900">Docs</Link>
                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </nav>
                    <button className="md:hidden">
                        <Menu className="text-gray-700" />
                        <span className="sr-only">Open menu</span>
                    </button>
                </div>
            </header>

            <nav className="bg-white border-b border-gray-200 overflow-x-auto">
                <div className="container mx-auto px-4">
                    <ul className="flex space-x-8 whitespace-nowrap">
                        <li className="py-4 border-b-2 border-black"><Link href="/" className="text-black">Overview</Link></li>
                        <li className="py-4"><Link href="/integrations" className="text-gray-500 hover:text-black">Integrations</Link></li>
                        <li className="py-4"><Link href="/activity" className="text-gray-500 hover:text-black">Activity</Link></li>
                        <li className="py-4"><Link href="/domains" className="text-gray-500 hover:text-black">Domains</Link></li>
                        <li className="py-4"><Link href="/usage" className="text-gray-500 hover:text-black">Usage</Link></li>
                        <li className="py-4"><Link href="/settings" className="text-gray-500 hover:text-black">Settings</Link></li>
                    </ul>
                </div>
            </nav>

            <section className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Say bye to manually</h1>
                    <div className="text-2xl md:text-4xl font-semibold mb-8">
                        Everything is <span className="inline-block transition-all duration-300 ease-in-out transform hover:scale-110">{automatedTexts[currentTextIndex]}</span>
                    </div>
                    <p className="text-xl mb-8 animate-fade-in-up">
                        We provide the developer tools and cloud infrastructure
                        <br />to build, scale, and secure a faster, more personalized web.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="/new-project" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200 ease-in-out">
                            Start Deploying
                        </Link>
                        <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors transform hover:scale-105 duration-200 ease-in-out">
                            Get a Demo
                        </button>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <Link href="/new-project" className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center sm:justify-start hover:bg-purple-700 transition-colors transform hover:scale-105 duration-200 ease-in-out">
                        <Plus size={20} className="mr-2" />
                        New Project
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white font-bold">
                                        {project.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold truncate">{project.name}</h3>
                                        <p className="text-sm text-gray-500 truncate">{project.domain}</p>
                                    </div>
                                </div>
                                {project.deploymentStatus && (
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 flex-shrink-0">
                    {project.deploymentStatus}
                  </span>
                                )}
                            </div>
                            <p className="text-sm mb-2 line-clamp-2">{project.lastCommit}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <GitCommit size={16} className="mr-1 flex-shrink-0" />
                                    <span>{project.lastCommitTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <Star size={16} className="mr-1 flex-shrink-0 text-yellow-400" />
                                    <span>{project.stars}</span>
                                </div>
                            </div>
                            <Link href={`/project/${project.id}`} className="mt-4 text-purple-600 hover:text-purple-800 flex items-center justify-end">
                                View Details
                                <ChevronRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}