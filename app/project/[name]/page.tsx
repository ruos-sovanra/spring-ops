'use client';
import { ExternalLink, GitBranch } from "lucide-react"
import {useEffect, useState} from "react";
import {Project} from "@/app/page";
import Link from "next/link";
import {useRouter} from "next/navigation";
import devops from "@/public/devops.gif"
import Image from "next/image";

type DeploymentInfo = {
    status: string;
    buildNumber: number;
    log: string;
}

export type PropsParams = {
    params: {
        name: string;
    };
};


export default function ProjectDetailPage(props: PropsParams) {
    const [projects, setProjects] = useState<Project>();
    const [deployments, setDeployments] = useState<DeploymentInfo[]>([]);

    const router = useRouter();

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-job/${props.params.name}`);
            const data = await res.json();
            console.log(data);
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDeployments = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-builds-info/${props.params.name}`);
            const data = await res.json();
            console.log(data);
            setDeployments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeploy = async (name: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/start-build`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobName: name }),
            });
            const data = await res.json();
            console.log("This is response",data);
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (name: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete-job/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            console.log("This is response", data);
            router.push('/project');

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProjects();
        fetchDeployments();
    }, []);

    console.log(deployments);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <main>
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Production Deployment</h2>
                        <div className="flex space-x-2">
                            <button
                                className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-all duration-300"
                                onClick={() => projects?.name && handleDeploy(projects.name)}
                            >
                                Deploy now
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-all duration-300"
                                onClick={() => projects?.name && handleDelete(projects.name)}
                            >
                                Delete now
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">The deployment that is available to your visitors.</p>

                    <div className="bg-black rounded-lg p-4 flex flex-col md:flex-row">
                        <div className="md:w-1/2 mb-4 md:mb-0">
                            <Image src={devops} height={300} width={300} alt="Deployment Preview"
                                 className="rounded-lg w-full h-auto"/>
                        </div>
                        <div className="md:w-1/2 md:pl-4 space-y-4">
                            <div>
                                <h3 className="text-gray-400 text-sm">Deployment</h3>
                                <p className="text-sm">{projects?.name}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Domains</h3>
                                <p className="text-sm flex items-center">
                                    https://{projects?.subdomain}.psa-khmer.world <ExternalLink className="w-4 h-4 ml-1" />
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Source</h3>
                                <p className="text-sm flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    {projects?.gitUrl}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Branch</h3>
                                <p className="text-sm flex items-center">
                                    <GitBranch className="w-4 h-4 mr-1" />
                                    {projects?.branch}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Deployments</h2>
                        <button className="text-gray-400 hover:text-white">...</button>
                    </div>

                    {deployments.map((deployment, index) => (
                        <div key={index} className="bg-black rounded-lg p-4 flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-sm font-medium">Deploy Number {deployment.buildNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <GitBranch className="w-4 h-4" />
                                <span>{deployment.status}</span>
                                <span className="text-gray-500">{deployment.log.slice(0, 50)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link href={`/project/${projects?.name}/${deployment.buildNumber}`} className="text-gray-400 hover:text-white">view</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}