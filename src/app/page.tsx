import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

const page =async () => {

  const snippets=await prisma.snippet.findMany();
  //console.log(snippets);

  return (
    <div className=''>
      <h1 className='font-bold text-3xl'>Home</h1>
      <div className="flex items-center flex-col justify-between">
        <div className=" flex flex-row justify-between w-full p-10">
        <h1 className='font-bold text-xl'>Your Snippets...</h1>
        <Button><Link href={"/snippet/new"} scroll={true}>New +</Link></Button>
        </div>
        
          <div className="w-full">
          {snippets?
          <ul className="w-full">
          {snippets.map((snippet)=>{
            return(
              <li key={snippet.id} className='flex flex-row justify-between border-2 border-b-gray-700 border-l-gray-700 py-2 px-5 items-center m-2'>
                <h2 className='font-bold text-l'>{snippet.title}</h2>
                <Button><Link href={`/viewSnippet/${snippet.id}`}>View</Link></Button>
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