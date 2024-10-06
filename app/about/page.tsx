"use client"

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import {Twitter, Terminal, Server, Cloud, Code, Database, Lock, Shield, Facebook, Instagram } from 'lucide-react'
import sovanra from '@/public/team.jpg'
import intructor from '@/public/instructor.jpg'
import sokny from '@/public/mehUI.jpg'
import vathanak from '@/public/nak.jpg'
import makara from '@/public/antony.jpg'
import soben from '@/public/hacker.jpg'

interface TeamMember {
    name: string
    position: string
    image: StaticImageData
    info: string
    skills: string[]
    social: {
        twitter?: string
        facebook?: string
        instagram?: string
    }
    bgColor: string
}

const teamMembers: TeamMember[] = [
    {
        name: "Ing Muyleang",
        position: "Instructor",
        image: intructor,
        info: "2+ years experience in CI/CD pipelines and cloud infrastructure",
        skills: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
        social: {
            twitter: "https://twitter.com/ingmuyleang",
            facebook: "https://facebook.com/ingmuyleang",
            instagram: "https://instagram.com/ingmuyleang"
        },
        bgColor: "from-blue-400 to-blue-300"
    },
    {
        name: "Ruos Sovanra",
        position: "Team Leader",
        image: sovanra,
        info: "Specialist in multi-cloud environments and serverless architectures",
        skills: ["Azure", "GCP", "Serverless", "Docker"],
        social: {
            twitter: "https://twitter.com/ruossovanra",
            facebook: "https://facebook.com/ruossovanra",
            instagram: "https://instagram.com/ruossovanra"
        },
        bgColor: "from-green-400 to-green-300"
    },
    {
        name: "On Soben",
        position: "Member",
        image: soben,
        info: "Expert in creating scalable automation solutions for complex systems",
        skills: ["Ansible", "Python", "Bash", "Puppet"],
        social: {
            twitter: "https://twitter.com/onsoben",
            facebook: "https://facebook.com/onsoben",
            instagram: "https://instagram.com/onsoben"
        },
        bgColor: "from-pink-400 to-pink-300"
    },
    {
        name: "Mom Makara",
        position: "Member",
        image: makara,
        info: "Focused on implementing DevSecOps practices and tools",
        skills: ["SAST", "DAST", "IAM", "Compliance"],
        social: {
            twitter: "https://twitter.com/mommakara",
            facebook: "https://facebook.com/mommakara",
            instagram: "https://instagram.com/mommakara"
        },
        bgColor: "from-purple-400 to-purple-300"
    },
    {
        name: "Pov Sokny",
        position: "Member",
        image: sokny,
        info: "Ensures high availability and performance of our systems",
        skills: ["Prometheus", "Grafana", "ELK Stack", "Chaos Engineering"],
        social: {
            twitter: "https://twitter.com/povsokny",
            facebook: "https://facebook.com/povsokny",
            instagram: "https://instagram.com/povsokny"
        },
        bgColor: "from-yellow-400 to-yellow-300"
    },
    {
        name: "Sol Vathanak",
        position: "Member",
        image: vathanak,
        info: "Designs and maintains our scalable infrastructure",
        skills: ["VMware", "OpenStack", "Networking", "Load Balancing"],
        social: {
            twitter: "https://twitter.com/solvathanak",
            facebook: "https://facebook.com/solvathanak",
            instagram: "https://instagram.com/solvathanak"
        },
        bgColor: "from-red-400 to-red-300"
    }
]

const DevOpsBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Terminal className="w-1/3 h-1/3 text-green-500 animate-pulse" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-full h-full flex items-center justify-center">
            <Server className="w-1/4 h-1/4 text-blue-500 animate-bounce" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-full h-full flex items-center justify-center">
            <Cloud className="w-1/3 h-1/3 text-purple-500 animate-pulse" />
        </div>
        <div className="absolute top-3/4 left-3/4 w-full h-full flex items-center justify-center">
            <Code className="w-1/4 h-1/4 text-yellow-500 animate-bounce" />
        </div>
    </div>
)

const AnimatedTerminal = () => {
    const [text, setText] = useState('')
    const fullText = `
$ docker build -t my-app .
[+] Building 12.5s (15/15) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 32B
 => [internal] load .dockerignore
 => => transferring context: 2B
 => [internal] load metadata for docker.io/library/node:14
 => [1/4] FROM docker.io/library/node:14
 => [internal] load build context
 => => transferring context: 32.65kB
 => CACHED [2/4] WORKDIR /app
 => [3/4] COPY . .
 => [4/4] RUN npm install
 => exporting to image
 => => exporting layers
 => => writing image sha256:e3d940c...
 => => naming to docker.io/library/my-app

$ docker run -d -p 3000:3000 my-app
21f6d8eb4...

$ kubectl apply -f deployment.yaml
deployment.apps/my-app created

$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
my-app-6d65c8756-8wz9t   1/1     Running   0          10s
my-app-6d65c8756-9hjv8   1/1     Running   0          10s
my-app-6d65c8756-x7zfq   1/1     Running   0          10s

$ echo "Deployment successful!"
Deployment successful!
`

    useEffect(() => {
        let i = 0
        const typing = setInterval(() => {
            setText(fullText.slice(0, i))
            i++
            if (i > fullText.length) {
                clearInterval(typing)
                setTimeout(() => {
                    setText('')
                    i = 0
                }, 2000) // Wait for 2 seconds before restarting
            }
        }, 20)

        return () => clearInterval(typing)
    }, [])

    return (
        <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-auto">
            <pre>{text}</pre>
        </div>
    )
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
            <DevOpsBackground />
            <main className="container mx-auto px-4 py-16 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
                >
                    Spring X DevOps Team
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-300"
                >
                    Empowering businesses with cutting-edge DevOps solutions and automation expertise.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    <div className="bg-gradient-to-br from-green-500 to-blue-600 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                            <Terminal className="mr-2" /> Our Mission
                        </h2>
                        <p className="text-gray-100">
                            To revolutionize business operations through advanced DevOps practices, enabling seamless integration, continuous delivery, and unparalleled efficiency.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                            <Cloud className="mr-2" /> Our Vision
                        </h2>
                        <p className="text-gray-100">
                            To create a world where every organization can harness the full potential of DevOps, driving innovation, scalability, and reliability across all industries.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                            <Shield className="mr-2" /> Our Values
                        </h2>
                        <p className="text-gray-100">
                            We prioritize collaboration, continuous learning, and innovation to deliver exceptional results and empower our clients in their digital transformation journey.
                        </p>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-3xl font-bold text-center mb-8 flex items-center justify-center"
                >
                    <Database className="mr-2 text-purple-500" /> Our DevOps Experts
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${member.bgColor} opacity-20`}></div>
                            <div className="p-6 flex flex-col items-center relative z-10">
                                <div className="w-48 h-48 mb-4 rounded-3xl overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={192}
                                        height={192}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white text-center">{member.name}</h3>
                                <p className="text-gray-300 text-sm mb-4 text-center">{member.position}</p>
                                <div className="flex justify-center space-x-4">
                                    {member.social.twitter && (
                                        <a
                                            href={member.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Twitter size={20} />
                                        </a>
                                    )}
                                    {member.social.facebook && (
                                        <a
                                            href={member.social.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Facebook size={20} />
                                        </a>
                                    )}
                                    {member.social.instagram && (
                                        <a
                                            href={member.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Instagram size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-3xl font-bold text-center mb-8 flex items-center justify-center"
                >
                    <Code className="mr-2 text-yellow-500" /> Deployment in Action
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mb-16"
                >
                    <AnimatedTerminal />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-center"
                >
                    <a
                        href="#contact"
                        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block flex items-center"
                    >
                        <Lock className="mr-2" /> Secure Your DevOps Consultation
                    </a>
                </motion.div>
            </main>
        </div>
    )
}