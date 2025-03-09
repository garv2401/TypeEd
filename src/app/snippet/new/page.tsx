import React from 'react'
// import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'



const page = () => {
    async function createSnippet(formdata:FormData){
        'use server'//server action function
        const title=formdata.get('title') as string;
        const code=formdata.get('code') as string;

        const snippet=await prisma.snippet.create({
          data:{
            title :title,
            code:code
          }
        })
        redirect("/");
        
        
    }
  return (
    <div className="">
        <h1 className='text-xl font-bold py-5'>Create New Snippet</h1>
        <form className="flex flex-col gap-3" action={createSnippet}>
        
        <div className="">
        <Label htmlFor="title" className='text-lg'>Title:</Label>
        <Input type='text' id='title' name='title'/>
        </div>

        <div className="">
        <Label htmlFor="code" className='text-lg'>Code:</Label>
        <Textarea id='code' name='code'/>
        </div>

        <div className="flex flex-row gap-2">
        <Button type='submit' className=''>Save</Button>
        <Button className=''><Link href={`/`} scroll={true}>Back</Link></Button> 
        </div>
        </form>
    </div>
  )
}

export default page