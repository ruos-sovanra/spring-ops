'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import classNames from 'classnames'

export default function NavbarComponent() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    // Shared classes based on dark mode
    const sharedClasses = {
        text: isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900',
        bg: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
        navBg: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
        activeLink: isDarkMode ? 'border-white text-white' : 'border-black text-black',
        icon: isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
    }

    return (
        <div className={classNames(isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')}>
            <header className={classNames(sharedClasses.bg, 'border-b')}>
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={classNames('w-8 h-8', isDarkMode ? 'bg-white' : 'bg-black')}></div>
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <span className="font-semibold hidden sm:inline">jonathondmeyers</span>
                            <span className={classNames('px-2 py-1 text-xs rounded-full hidden sm:inline', isDarkMode ? 'bg-gray-700' : 'bg-gray-200')}>
                                Hobby
                            </span>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        {['Feedback', 'Changelog', 'Support', 'Docs'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className={sharedClasses.text}>
                                {item}
                            </Link>
                        ))}
                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <Sun className={sharedClasses.icon} /> : <Moon className={sharedClasses.icon} />}
                        </button>
                    </nav>
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <Sun className={sharedClasses.icon} /> : <Moon className={sharedClasses.icon} />}
                        </button>
                        <button>
                            <Menu className={sharedClasses.icon} />
                            <span className="sr-only">Open menu</span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className={classNames(sharedClasses.navBg, 'border-b overflow-x-auto')}>
                <div className="container mx-auto px-4">
                    <ul className="flex space-x-8 whitespace-nowrap">
                        <li className={classNames('py-4 border-b-2', sharedClasses.activeLink)}>
                            <Link href="/" className={sharedClasses.activeLink}>Overview</Link>
                        </li>
                        {['Project', 'Domain', 'About'].map((item) => (
                            <li key={item} className="py-4">
                                <Link href={`/${item.toLowerCase()}`} className={sharedClasses.text}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}
