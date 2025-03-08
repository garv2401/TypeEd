//import { prisma } from "@prisma/client";
'use server'
import { prisma } from '@/lib/prisma';

async function getSnippet(id:string){
    const snippet=await prisma.snippet.findUnique({
        where:{
            id:Number(id)
        }
    })
    return snippet;
}

async function updateSnippet(id:string,title:string,code:string){
    await prisma.snippet.update({
        where:{
            id:Number(id)
        },
        data:{
            title:title,
            code:code
        }
    })
}

async function deleteSnippet(id:string){
    await prisma.snippet.delete({
        where:{
            id:Number(id)
        },
    })
}

export {getSnippet,updateSnippet,deleteSnippet}