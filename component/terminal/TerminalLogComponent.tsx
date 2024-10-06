"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Maximize2, Minimize2, X } from "lucide-react"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'success' | 'progress' | 'warning' | 'info'
    content: string
}

const devopsCommands = [
    {
        input: "docker build -t myapp .",
        output: [
            { type: 'info', content: "Building Docker image..." },
            { type: 'output', content: "Sending build context to Docker daemon  2.048kB" },
            { type: 'output', content: "Step 1/10 : FROM node:14" },
            { type: 'output', content: "..." },
            { type: 'success', content: "Successfully built 3a1b2c3d4e5f" },
            { type: 'success', content: "Successfully tagged myapp:latest" }
        ]
    },
    {
        input: "kubectl apply -f deployment.yaml",
        output: [
            { type: 'info', content: "Applying Kubernetes deployment..." },
            { type: 'success', content: "deployment.apps/myapp created" },
            { type: 'success', content: "service/myapp-service created" }
        ]
    },
    {
        input: "terraform init",
        output: [
            { type: 'info', content: "Initializing Terraform..." },
            { type: 'output', content: "Initializing the backend..." },
            { type: 'output', content: "Initializing provider plugins..." },
            { type: 'output', content: "- Finding latest version of hashicorp/aws..." },
            { type: 'output', content: "- Installing hashicorp/aws v3.74.0..." },
            { type: 'success', content: "Terraform has been successfully initialized!" }
        ]
    },
    {
        input: "terraform apply",
        output: [
            { type: 'info', content: "Applying Terraform changes..." },
            { type: 'output', content: "An execution plan has been generated and is shown below." },
            { type: 'output', content: "Terraform will perform the following actions:" },
            { type: 'output', content: "" },
            { type: 'output', content: "  # aws_instance.example will be created" },
            { type: 'output', content: "  + resource \"aws_instance\" \"example\" {" },
            { type: 'output', content: "      + ami           = \"ami-0c55b159cbfafe1f0\"" },
            { type: 'output', content: "      + instance_type = \"t2.micro\"" },
            { type: 'output', content: "      # (.... more attributes hidden ....)" },
            { type: 'output', content: "    }" },
            { type: 'output', content: "" },
            { type: 'warning', content: "Plan: 1 to add, 0 to change, 0 to destroy." },
            { type: 'output', content: "" },
            { type: 'info', content: "Do you want to perform these actions?" },
            { type: 'info', content: "  Terraform will perform the actions described above." },
            { type: 'info', content: "  Only 'yes' will be accepted to approve." },
            { type: 'output', content: "" },
            { type: 'input', content: "  Enter a value: yes" },
            { type: 'output', content: "" },
            { type: 'output', content: "aws_instance.example: Creating..." },
            { type: 'success', content: "aws_instance.example: Creation complete after 30s [id=i-1234567890abcdef0]" },
            { type: 'output', content: "" },
            { type: 'success', content: "Apply complete! Resources: 1 added, 0 changed, 0 destroyed." }
        ]
    },
    {
        input: "ansible-playbook site.yml",
        output: [
            { type: 'info', content: "Running Ansible playbook..." },
            { type: 'output', content: "PLAY [all] ********************************************************************" },
            { type: 'output', content: "" },
            { type: 'output', content: "TASK [Gathering Facts] *********************************************************" },
            { type: 'success', content: "ok: [server1]" },
            { type: 'success', content: "ok: [server2]" },
            { type: 'output', content: "" },
            { type: 'output', content: "TASK [Install Apache] **********************************************************" },
            { type: 'warning', content: "changed: [server1]" },
            { type: 'warning', content: "changed: [server2]" },
            { type: 'output', content: "" },
            { type: 'output', content: "TASK [Start Apache] ************************************************************" },
            { type: 'success', content: "ok: [server1]" },
            { type: 'success', content: "ok: [server2]" },
            { type: 'output', content: "" },
            { type: 'output', content: "PLAY RECAP **********************************************************************" },
            { type: 'success', content: "server1                    : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   " },
            { type: 'success', content: "server2                    : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   " }
        ]
    }
]

export default function EnhancedDevOpsTerminal() {
    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
    const [isMinimized, setIsMinimized] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const terminalRef = useRef<HTMLDivElement>(null)

    const typeCommand = async (command: string) => {
        for (let i = 0; i < command.length; i++) {
            await sleep(50)
            setTerminalLines(prev => [
                ...prev.slice(0, -1),
                { type: 'input', content: command.slice(0, i + 1) }
            ])
        }
        await sleep(500)
    }

    const simulateProgress = async () => {
        for (let i = 0; i <= 100; i += 10) {
            await sleep(200)
            setTerminalLines(prev => [
                ...prev,
                { type: 'progress', content: `[${'='.repeat(i / 10)}${' '.repeat(10 - i / 10)}] ${i}%` }
            ])
        }
    }

    const runCommands = async () => {
        while (true) {
            for (const command of devopsCommands) {
                setTerminalLines(prev => [...prev, { type: 'input', content: '$ ' }])
                await typeCommand(command.input)
                setTerminalLines(prev => [...prev, { type: 'input', content: `$ ${command.input}` }])

                if (Math.random() < 0.2) {
                    await sleep(1000)
                    setTerminalLines(prev => [...prev, { type: 'error', content: 'Error: Connection timed out. Retrying...' }])
                    await sleep(2000)
                }

                if (command.input.includes('terraform apply')) {
                    await simulateProgress()
                }

                for (const line of command.output) {
                    await sleep(Math.random() * 500 + 100)
                    setTerminalLines(prev => [
                        ...prev,
                        { type: line.type as 'input' | 'output' | 'error' | 'success' | 'progress' | 'warning' | 'info', content: line.content }
                    ])
                }

                await sleep(1000)
            }

            // Clear the terminal after each full cycle
            setTerminalLines([])
            await sleep(2000)
        }
    }

    useEffect(() => {
        runCommands()
    }, [])

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [terminalLines])

    return (
        <div className={`bg-gray-900 text-white p-4 ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} flex items-center justify-center`}>
            <div className={`w-full ${isFullscreen ? 'h-full' : 'max-w-4xl'}`}>
                <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${isMinimized ? 'h-12' : ''}`}>
                    <div className="bg-gray-700 p-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Terminal className="text-gray-400" size={18} />
                            <span className="text-sm font-medium text-gray-300">DevOps Terminal</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white">
                                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                            </button>
                            <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-gray-400 hover:text-white">
                                <Maximize2 size={18} />
                            </button>
                            <button className="text-gray-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                    {!isMinimized && (
                        <div
                            ref={terminalRef}
                            className={`font-mono text-sm overflow-y-auto p-4 ${isFullscreen ? 'h-[calc(100vh-48px)]' : 'h-96'}`}
                        >
                            <AnimatePresence initial={false}>
                                {terminalLines.map((line, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={
                                            line.type === 'input' ? 'text-yellow-400' :
                                                line.type === 'error' ? 'text-red-500' :
                                                    line.type === 'success' ? 'text-green-500' :
                                                        line.type === 'progress' ? 'text-blue-400' :
                                                            line.type === 'warning' ? 'text-orange-400' :
                                                                line.type === 'info' ? 'text-cyan-400' :
                                                                    'text-gray-300'
                                        }
                                    >
                                        {line.content}
                                        {index === terminalLines.length - 1 && line.type === 'input' && (
                                            <span className="inline-block w-2 h-4 ml-1 bg-gray-300 animate-pulse"></span>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}