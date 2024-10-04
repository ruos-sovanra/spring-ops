"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {Linkedin, Twitter, Terminal, Server, Cloud, Code, Database, Lock, Github} from 'lucide-react'

interface TeamMember {
    name: string
    position: string
    image: string
    info: string
    skills: string[]
    social: {
        github?: string
        linkedin?: string
        twitter?: string
    }
}

const teamMembers: TeamMember[] = [
    {
        name: "Sarah Johnson",
        position: "Lead DevOps Engineer",
        image: "/placeholder.svg?height=400&width=400&text=SJ",
        info: "10+ years experience in CI/CD pipelines and cloud infrastructure",
        skills: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
        social: {
            github: "https://github.com/sarahjohnson",
            linkedin: "https://linkedin.com/in/sarahjohnson",
            twitter: "https://twitter.com/sarahjohnson"
        }
    },
    {
        name: "Michael Chang",
        position: "Cloud Architect",
        image: "/placeholder.svg?height=400&width=400&text=MC",
        info: "Specialist in multi-cloud environments and serverless architectures",
        skills: ["Azure", "GCP", "Serverless", "Docker"],
        social: {
            github: "https://github.com/michaelchang",
            linkedin: "https://linkedin.com/in/michaelchang"
        }
    },
    {
        name: "Emily Rodriguez",
        position: "Automation Specialist",
        image: "/placeholder.svg?height=400&width=400&text=ER",
        info: "Expert in creating scalable automation solutions for complex systems",
        skills: ["Ansible", "Python", "Bash", "Puppet"],
        social: {
            github: "https://github.com/emilyrodriguez",
            linkedin: "https://linkedin.com/in/emilyrodriguez",
            twitter: "https://twitter.com/emilyrodriguez"
        }
    },
    {
        name: "David Kim",
        position: "Security Engineer",
        image: "/placeholder.svg?height=400&width=400&text=DK",
        info: "Focused on implementing DevSecOps practices and tools",
        skills: ["SAST", "DAST", "IAM", "Compliance"],
        social: {
            github: "https://github.com/davidkim",
            linkedin: "https://linkedin.com/in/davidkim"
        }
    },
    {
        name: "Lisa Chen",
        position: "Site Reliability Engineer",
        image: "/placeholder.svg?height=400&width=400&text=LC",
        info: "Ensures high availability and performance of our systems",
        skills: ["Prometheus", "Grafana", "ELK Stack", "Chaos Engineering"],
        social: {
            github: "https://github.com/lisachen",
            linkedin: "https://linkedin.com/in/lisachen",
            twitter: "https://twitter.com/lisachen"
        }
    },
    {
        name: "Alex Novak",
        position: "Infrastructure Engineer",
        image: "/placeholder.svg?height=400&width=400&text=AN",
        info: "Designs and maintains our scalable infrastructure",
        skills: ["VMware", "OpenStack", "Networking", "Load Balancing"],
        social: {
            github: "https://github.com/alexnovak",
            linkedin: "https://linkedin.com/in/alexnovak"
        }
    }
]

const DevOpsBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Terminal className="w-1/3 h-1/3 text-green-500" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-full h-full flex items-center justify-center">
            <Server className="w-1/4 h-1/4 text-blue-500" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-full h-full flex items-center justify-center">
            <Cloud className="w-1/3 h-1/3 text-purple-500" />
        </div>
        <div className="absolute top-3/4 left-3/4 w-full h-full flex items-center justify-center">
            <Code className="w-1/4 h-1/4 text-yellow-500" />
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
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
            <DevOpsBackground />
            <main className="container mx-auto px-4 py-16 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
                >
                    AutomateX DevOps Team
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                >
                    <div className="bg-gray-800 p-8 rounded-lg border border-green-500">
                        <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                            <Terminal className="mr-2" /> Our Mission
                        </h2>
                        <p className="text-gray-300">
                            To revolutionize business operations through advanced DevOps practices, enabling seamless integration, continuous delivery, and unparalleled efficiency.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg border border-blue-500">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                            <Cloud className="mr-2" /> Our Vision
                        </h2>
                        <p className="text-gray-300">
                            To create a world where every organization can harness the full potential of DevOps, driving innovation, scalability, and reliability across all industries.
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
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-green-400 text-sm">{member.position}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm mb-4">{member.info}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="bg-gray-700 text-green-400 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                                    ))}
                                </div>
                                <div className="flex justify-start space-x-4">
                                    {member.social.github && (
                                        <a
                                            href={member.social.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {member.social.linkedin && (
                                        <a
                                            href={member.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Linkedin size={20} />
                                        </a>
                                    )}
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