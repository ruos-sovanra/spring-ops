'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import classNames from 'classnames'
import springxops from '@/public/springOps.jpg'

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="bg-gray-900 text-white">
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Image
                                src={springxops}
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <span className="font-semibold hidden sm:inline">SpringOps4</span>
                            <span className="px-2 py-1 text-xs rounded-full hidden sm:inline bg-gray-700">
                Hobby
              </span>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            <Menu className="text-gray-300 hover:text-white" />
                        </button>
                    </div>
                </div>
            </header>

            <nav className={classNames(
                "bg-gray-800 border-b border-gray-700 overflow-x-auto",
                { "hidden": !isMenuOpen, "block": isMenuOpen },
                "md:block"
            )}>
                <div className="container mx-auto px-4">
                    <ul className="flex flex-col md:flex-row md:space-x-8 whitespace-nowrap">
                        <li className="py-4 border-b-2 border-white text-white">
                            <Link href="/">Overview</Link>
                        </li>
                        {['Project', 'Domain', 'About'].map((item) => (
                            <li key={item} className="py-4">
                                <Link href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white">
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