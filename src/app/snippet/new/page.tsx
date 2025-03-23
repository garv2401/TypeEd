'use client'
import React from 'react'
// import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
//import { prisma } from '@/lib/prisma'
//import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useActionState } from 'react'
import * as actions from '@/actions/index'
//import toast, { Toaster } from "react-hot-toast";
//import { format } from 'path'



const AddSnippet = () => {
  const [formData,xyz]=useActionState(actions.createSnippet,{message:''});

  // if(formData.message){
  //   toast.error(formData.message);
  // }

  // const displayToast=()=>{
  //   if(formData.message){
  //     toast.success(formData.message);
  //   }
  // }

    
  return (
    <div className="">
        <h1 className='text-xl font-bold py-5'>Create New Snippet</h1>
        <form className="flex flex-col gap-3" action={xyz}>
        
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

        {formData.message && <div className=" w-full p-3 bg-red-300 border-2 border-red-700 mt-4">
          <p>{formData.message}</p>
        </div>}
    </div>
  )
}

export default AddSnippet;