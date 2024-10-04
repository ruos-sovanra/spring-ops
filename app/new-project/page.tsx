'use client';
import React from 'react';
import { ChevronLeft, Github } from 'lucide-react';
import Link from 'next/link';
import { useFormik } from 'formik';

export default function ProjectDeployment() {
    const formik = useFormik({
        initialValues: {
            name: 'final-ecommerce',
            gitUrl: '',
            branch: '',
            subdomain: '',
            token: '',
            isAutomated: false,
        },
        onSubmit: (values) => {
            console.log(values);
            const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            console.log(res);
        },
    });

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <Link href={"/project"} className="text-gray-400 hover:text-white flex items-center">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Link>
                </div>

                <h1 className="text-4xl font-bold mb-4">You are almost done.</h1>
                <p className="text-gray-400 mb-8">Please follow the steps to configure your Project and deploy it.</p>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-gray-900 p-4 rounded-lg mb-4">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Github className="w-5 h-5" />
                                <span>final-ecommerce</span>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <button className="w-full text-left p-2 rounded bg-gray-800 text-white">Configure Project</button>
                            <button className="w-full text-left p-2 rounded text-gray-400 hover:bg-gray-800 hover:text-white">Deploy</button>
                        </nav>
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold text-gray-400 uppercase text-sm">GIT REPOSITORY</h3>
                            <div className="flex items-center space-x-2 text-sm">
                                <Github className="w-4 h-4" />
                                <span>repository/branch</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 3v12"></path>
                                    <circle cx="18" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <path d="M18 9a9 9 0 0 1-9 9"></path>
                                </svg>
                                <span>main</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-gray-900 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 text-white">Configure Project</h2>
                            <form onSubmit={formik.handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Git URL</label>
                                    <input
                                        type="text"
                                        name="gitUrl"
                                        value={formik.values.gitUrl}
                                        onChange={formik.handleChange}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                        placeholder="https://github.com/username/repo.git"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Branch</label>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={formik.values.branch}
                                        onChange={formik.handleChange}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                        placeholder="main"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Domain Name</label>
                                    <input
                                        type="text"
                                        name="subdomain"
                                        value={formik.values.subdomain}
                                        onChange={formik.handleChange}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                        placeholder="example.com"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-400">Automate Deployments</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            name="isAutomated"
                                            checked={formik.values.isAutomated}
                                            onChange={formik.handleChange}
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                {formik.values.isAutomated && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Git Token</label>
                                        <input
                                            type="password"
                                            name="token"
                                            value={formik.values.token}
                                            onChange={formik.handleChange}
                                            className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                            placeholder="Enter your Git token"
                                        />
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-semibold py-2 px-4 rounded mt-6"
                                >
                                    Deploy
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
