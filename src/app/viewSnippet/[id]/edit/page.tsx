'use client'
import { prisma } from '@/lib/prisma'
import React, { useEffect, useState} from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {getSnippet,updateSnippet,deleteSnippet} from './getSnippet';
import { Textarea } from '@/components/ui/textarea';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';

const Page = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
        const fetchSnippet = async () => {
            const snippet=await getSnippet(params.id);
            if (!snippet) {
                notFound();
                return;
            }
            setTitle(snippet.title);
            setCode(snippet.code);
            setLoading(false);
        };

        fetchSnippet();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;

    const handleSave=async()=>{
        await updateSnippet(params.id,title,code);
        toast('Updated Successfully!');
    }

    const handleDelete=async ()=>{
        await deleteSnippet(params.id);
        toast('Deleted Successfully!');
        redirect('/');
    }

    return (
        <>   
            <div>Edit your snippet...with id={params.id}</div>
            <div className="w-full">
                <div className="w-full flex flex-row justify-between items-center mb-2">
                    <Input type="text" className='font-bold text-2xl mr-2' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <div className="flex flex-row gap-3 justify-around ">
                        <Button onClick={()=>handleSave()}>Save</Button>
                        <Button onClick={()=>handleDelete()}>Delete</Button>
                        <Button><Link href={`/viewSnippet/${params.id}`} scroll={true}>Back</Link></Button> 
                    </div>
                </div>
                <Textarea className='bg-gray-100 p-4 rounded' id='code' name='code' value={code} onChange={(e) => setCode(e.target.value)}/>
                <Toaster />
            </div>
        </>
    );
}

export default Page;