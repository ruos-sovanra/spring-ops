'use client';
import React, { useState, useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'

type PropsParams = {
    params: {
        name: string;
        buildNumber: number;
    };
};

export default function DeploymentLogs(props: PropsParams) {
    const name = props.params.name;
    const buildNumber = props.params.buildNumber;

    const [logs, setLogs] = useState<string[]>([]);
    const [isDeploying, setIsDeploying] = useState(true); // Define state for deployment status
    const eventSourceRef = useRef<EventSource | null>(null);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize EventSource
        eventSourceRef.current = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/stream-build-log/${name}/${buildNumber}`);

        // Handle incoming log messages (plain text)
        eventSourceRef.current.onmessage = (event) => {
            // Split the event data by newline and append each line as a separate log entry
            const newLogs = event.data.split('\n');
            setLogs(prevLogs => [...prevLogs, ...newLogs]); // Append new logs to the state
        };

        // Handle error or stream closure
        eventSourceRef.current.onerror = (error) => {
            console.error('EventSource failed:', error);
            setIsDeploying(false); // Set deployment as completed on error
            eventSourceRef.current?.close();
        };

        return () => {
            eventSourceRef.current?.close(); // Cleanup event source on unmount
        };
    }, [name, buildNumber]);

    useEffect(() => {
        // Scroll to the bottom of the log container when new logs are added
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    console.log(logs);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Deployment</h1>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${isDeploying ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`}></div>
                            <span className="font-semibold">{isDeploying ? 'Building' : 'Ready'}</span>
                        </div>
                        <span className="text-sm text-gray-400">Production (Current)</span>
                    </div>
                    <div className="text-sm text-gray-400">{name} is building</div>
                </div>
                <div
                    ref={logContainerRef}
                    className="bg-gray-900 rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto font-mono text-sm"
                >
                    {logs.map((log, index) => (
                        <div key={index} className="mb-1 flex items-start">
                            <div className="mr-2 mt-1"><Terminal className="w-4 h-4 text-blue-400" /></div>
                            <div>{log}</div>
                        </div>
                    ))}
                    {isDeploying && (
                        <div className="animate-pulse">
                            <span className="inline-block w-2 h-4 bg-gray-500 mr-1"></span>
                            <span className="inline-block w-2 h-4 bg-gray-500 mr-1"></span>
                            <span className="inline-block w-2 h-4 bg-gray-500"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
