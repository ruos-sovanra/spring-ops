'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, Moon, Sun } from 'lucide-react'
import {useState} from 'react'

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(true)


    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }
    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} `}>
            <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <span className="font-semibold hidden sm:inline">jonathondmeyers</span>
                            <span className={`px-2 py-1 text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full hidden sm:inline`}>Hobby</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/feedback" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Feedback</Link>
                        <Link href="/changelog" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Changelog</Link>
                        <Link href="/support" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Support</Link>
                        <Link href="/docs" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Docs</Link>
                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <Sun className="text-gray-300 hover:text-white" /> : <Moon className="text-gray-700 hover:text-gray-900" />}
                        </button>
                    </nav>
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <Sun className="text-gray-300 hover:text-white" /> : <Moon className="text-gray-700 hover:text-gray-900" />}
                        </button>
                        <button>
                            <Menu className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
                            <span className="sr-only">Open menu</span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b overflow-x-auto`}>
                <div className="container mx-auto px-4">
                    <ul className="flex space-x-8 whitespace-nowrap">
                        <li className={`py-4 border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`}><Link href="/" className={isDarkMode ? "text-white" : "text-black"}>Overview</Link></li>
                        <li className="py-4"><Link href="/project" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>Project</Link></li>
                        <li className="py-4"><Link href="/domain" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>Domain</Link></li>
                        <li className="py-4"><Link href="/about" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>About</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}