import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

const page =async () => {

  const snippets=await prisma.snippet.findMany();
  //console.log(snippets);

  return (
    <div className=''>
      <div className="flex flex-row gap-2">
        <Image className='rounded-3xl' src='/TypeEd_logo.webp' width={40} height={30} alt='logo'/>
        <h1 className='text-3xl font-bold'>TypeEd</h1>
      </div>
      <div className="flex items-center flex-col justify-between">
        <div className=" flex flex-row justify-between w-full p-5">
        <h1 className='font-bold text-xl'>Type Script Code Editor</h1>
        <Button><Link href={"/snippet/new"} scroll={true}>New +</Link></Button>
        </div>
        
          <div className="w-full">
          {snippets?
          <ul className="w-full">
          {snippets.map((snippet)=>{
            return(
              <li key={snippet.id} className='flex flex-row justify-between border-2 py-2 px-5 items-center m-2 bg-gray-200'>
                <h2 className='font-bold text-l'>{snippet.title}</h2>
                <Button variant={"link"}><Link href={`/viewSnippet/${snippet.id}`}>View</Link></Button>
              </li>
            )
          })}
          </ul>
          :<p>No Snippets</p>
          }
          </div>
      </div>
    </div>
  )
}

export default page