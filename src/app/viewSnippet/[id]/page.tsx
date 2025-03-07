import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {Button} from "@/components/ui/button";

export default async function SnippetDetail({ params }: { params: { id: string } }) {
    const snippetId = Number(params.id); // Convert to number (without await)

    if (isNaN(snippetId)) return notFound(); // Handle invalid IDs

    const snippet = await prisma.snippet.findUnique({
        where: { id: snippetId }, // Use correct ID format
    });

    if (!snippet) return notFound(); // Show 404 if snippet doesn't exist

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between items-center mb-2">
            <h1 className="font-bold text-2xl">{snippet.title}</h1>
            <div className="flex flex-row gap-3 justify-around ">
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>

            </div>
            
            <pre className="bg-gray-100 p-4 rounded">{snippet.code}</pre>
            
        </div>
    );
}
