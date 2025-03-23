"use client";
//import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSnippet, updateSnippet} from "./getSnippet";
//import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import Editor from "@monaco-editor/react";
//import { redirect } from "next/navigation";
//import { Fira_Code } from "next/font/google";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const {id}=use(params);

  useEffect(() => {
    const fetchSnippet = async () => {
      const snippet = await getSnippet(id);
      if (!snippet) {
        notFound();
        return;
      }
      setTitle(snippet.title);
      setCode(snippet.code);
      setLoading(false);
    };

    fetchSnippet();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  const handleSave = async () => {
    await updateSnippet(id, title, code);
    toast.success("Updated Successfully!");
  };

  // const handleDelete = async () => {
  //   await deleteSnippet(id);
  //   toast.remove("Deleted Successfully!");
  //   redirect("/");
  // };

  function handleEditorChange(value:string | undefined) {
    if(value!==undefined){
        setCode(value);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full flex flex-row justify-between items-center">
          <Input
            type="text"
            className="font-bold mr-3"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-row gap-3 justify-around ">
            <Button onClick={() => handleSave()}>Save</Button>
            <Button>
              <Link href={`/viewSnippet/${id}`} scroll={true}>
                Back
              </Link>
            </Button>
          </div>
        </div>
        <Toaster />
        <Editor
          height="80vh"
          defaultLanguage="typescript"
          value={code}
          theme="vs-dark"
          onChange={(value)=>handleEditorChange(value)}
        />
      </div>
    </>
  );
};

export default Page;
