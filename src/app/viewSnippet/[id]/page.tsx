
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
//import {getSnippet } from "./edit/getSnippet";
//import toast, { Toaster } from 'react-hot-toast';
import * as actions from '@/actions/index';
// import { useEffect,useState } from "react";
// import { useRouter } from "next/navigation";
// import { use } from "react"; 
//import { redirect } from "next/navigation";

const SnippetDetail =async ({ params }: { params: Promise<{ id: string }> })=> {
    // const snippetId =parseInt((params).id); // Convert to number (without await)

    // if (isNaN(snippetId)) return notFound();

    // const [title, setTitle] = useState<string>('');
    // const [code, setCode] = useState<string>('');

    // const snippet = await prisma.snippet.findUnique({
    //     where: { id: snippetId }, // Use correct ID format
    // });


    // const { id } = use(params);
    // const router=useRouter();
    
    // const [snippet, setSnippet] = useState({title:'',code:''});


    const snippet=await actions.getSnippet((await params).id);
    // useEffect(() => {
    //     const fetchSnippet = async () => {
    //         const snippet = await getSnippet(id);
    //         if (!snippet) {
    //             notFound();
    //             return;
    //         }
    //         setSnippet(snippet);
    //     };
    //     fetchSnippet();
    // }, [id]);
    if(!snippet){return notFound()};
    const handleDelete=actions.deleteSnippet.bind(null,snippet.id as unknown as string);
    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between items-center mb-5">
            <h1 className="font-bold text-2xl">{snippet.title}</h1>
            <div className="flex flex-row gap-3 justify-around ">
                <Button><Link href={"/"} scroll={true}>Back</Link></Button>  
                <Button><Link href={`/viewSnippet/${snippet.id}/edit`} scroll={true}>Edit</Link></Button>
                {/* <Button variant={"destructive"} onClick={()=>handleDelete()}>Delete</Button> */}
                <form action={handleDelete} >
                <Button variant={"destructive"} type="submit">
                              Delete
                            </Button>
                </form>
            </div>
            </div>
            <pre className="bg-gray-200 p-4 rounded text-lg border-gray-300">{snippet.code}</pre>
            {/* <Toaster/> */}
        </div>
    );
}

export default SnippetDetail;
export const revalidate=0;
//making this route from static to dynamic

export const generateStaticParams=async()=>{
    'use server'
    const snippets=await prisma.snippet.findMany();

    return snippets.map((snippet)=>{
        return {
            id:snippet.id.toString()
        }
    })
}

