"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";//for on demand caching



async function createSnippet(
  prevState: { message: string },
  formdata: FormData
) {
  try {
    const title = formdata.get("title");
    const code = formdata.get("code");

    if (typeof title !== "string" || title.length < 4) {
      return {
        message: "Title is required and must be longer than 4 characters!",
      };
    }

    if (typeof code !== "string" || code.length < 4) {
      return {
        message: "Code is required and must be longer than 4 characters!",
      };
    }

     await prisma.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
    //throw new Error("Not implemented");
  } catch (error:unknown) {
    if(error instanceof Error){
      return { message:error.message};
    }else{
      return {message:"Some internal error occurred"};
    }

  }
  revalidatePath("/");
  redirect("/");
  
}

async function getSnippet(id: string) {
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: Number(id),
    },
  });
  return snippet;
}

async function updateSnippet(id: string, title: string, code: string) {
  await prisma.snippet.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      code: code,
    },
  });
}

async function deleteSnippet(id: string) {
  await prisma.snippet.delete({
    where: {
      id: Number(id),
    },
  });
  revalidatePath("/");
  redirect('/');
}

export { getSnippet, updateSnippet, deleteSnippet,createSnippet };
