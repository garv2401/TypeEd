
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { deleteSnippet, getSnippet } from "./edit/getSnippet";
import toast, { Toaster } from 'react-hot-toast';
//import { useEffect,useState } from "react";
//import { useRouter } from "next/router";

export default async function SnippetDetail({ params }: { params: { id: string } }) {
    const snippetId =parseInt((await params).id); // Convert to number (without await)

    if (isNaN(snippetId)) return notFound();
    
    // const [title, setTitle] = useState<string>('');
    // const [code, setCode] = useState<string>('');

    const snippet = await prisma.snippet.findUnique({
        where: { id: snippetId }, // Use correct ID format
    });
    //const snippet=await getSnippet((await params).id);

    if(!snippet) return notFound();

    // const handleDelete=async ()=>{
    //     await deleteSnippet(params.id);
    //     toast('Deleted Successfully!');
    //     const router=useRouter();
    //     router.push('/');
    // }
    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between items-center mb-5">
            <h1 className="font-bold text-2xl">{snippet.title}</h1>
            <div className="flex flex-row gap-3 justify-around ">
                <Button><Link href={"/"} scroll={true}>Back</Link></Button>  
                <Button><Link href={`/viewSnippet/${params.id}/edit`} scroll={true}>Edit</Link></Button>
                {/* <Button variant={"destructive"} onClick={()=>handleDelete()}>Delete</Button> */}
            </div>
            </div>
            <pre className="bg-gray-200 p-4 rounded text-lg border-gray-300">{snippet.code}</pre>
        </div>
    );
}
