"use client"

import { useState } from "react"
import { Globe, MoreVertical, Plus, RefreshCw, Trash } from "lucide-react"

export default function DomainManagement() {
    const [domains, setDomains] = useState([
        { id: 1, name: "example.com", status: "Active", expiresAt: "2024-12-31" },
        { id: 2, name: "mysite.org", status: "Pending", expiresAt: "2025-06-30" },
        { id: 3, name: "coolapp.io", status: "Active", expiresAt: "2024-09-15" },
    ])

    const [newDomain, setNewDomain] = useState("")
    const [openDropdown, setOpenDropdown] = useState<number | null>(null)

    const addDomain = () => {
        if (newDomain) {
            setDomains([
                ...domains,
                {
                    id: domains.length + 1,
                    name: newDomain,
                    status: "Pending",
                    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                },
            ])
            setNewDomain("")
        }
    }

    const deleteDomain = (id: number) => {
        setDomains(domains.filter((domain) => domain.id !== id))
        setOpenDropdown(null)
    }

    const toggleDropdown = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <h1 className="text-3xl font-bold">Domain Management</h1>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Enter new domain"
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            className="bg-gray-800 text-gray-100 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            onClick={addDomain}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Domain
                        </button>
                    </div>
                </header>

                <div className="space-y-4">
                    {domains.map((domain) => (
                        <div key={domain.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center space-x-4">
                                    <Globe className="h-6 w-6 text-blue-400" />
                                    <div>
                                        <h2 className="text-xl font-semibold">{domain.name}</h2>
                                        <p className="text-sm text-gray-400">Expires on {domain.expiresAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      domain.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {domain.status}
                  </span>
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(domain.id)}
                                            className="text-gray-400 hover:text-gray-100 focus:outline-none"
                                        >
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                        {openDropdown === domain.id && (
                                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                                                        role="menuitem"
                                                    >
                                                        <RefreshCw className="inline mr-2 h-4 w-4" /> Renew Domain
                                                    </button>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-400"
                                                        role="menuitem"
                                                        onClick={() => deleteDomain(domain.id)}
                                                    >
                                                        <Trash className="inline mr-2 h-4 w-4" /> Delete Domain
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}