"use client"

import Link from "next/link"
import {useEffect, useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, GitCommit, Star, ChevronRight } from "lucide-react"
import {Project} from "@/app/page";




export default function ProjectListingPage() {
    const [searchTerm, setSearchTerm] = useState("")
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

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Your Projects</h1>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full w-full focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-100 placeholder-gray-400 shadow-inner"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
                    </div>
                    <Link href="/new-project"
                          className="bg-purple-600 text-white px-6 py-3 rounded-full flex items-center w-full sm:w-auto justify-center sm:justify-start hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                        <Plus size={20} className="mr-2"/>
                        New Project
                    </Link>
                </div>

                <AnimatePresence>
                    {filteredProjects.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-gray-400 mt-8"
                        >
                            No projects found. Try a different search term.
                        </motion.p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-700 group"
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}