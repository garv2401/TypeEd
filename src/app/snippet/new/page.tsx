import React from 'react'
// import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'



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

        //console.log(snippet);
        redirect("/");
        
        
    }
  return (
    <div className="">
        <h1>Create New Snippet</h1>
        <form className="" action={createSnippet}>
        
        <div className="">
        <Label htmlFor="title">Title:</Label>
        <Input type='text' id='title' name='title'/>
        </div>

        <div className="">
        <Label htmlFor="code">Code:</Label>
        <Textarea id='code' name='code'/>
        </div>

        <Button type='submit' className='mt-4'>New</Button>
        </form>


    </div>
    

    
  )
}

export default page