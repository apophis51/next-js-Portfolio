'use client';

import dynamic from "next/dynamic";

const CreateANewBlo = dynamic(() => import("./CreateANewBlog"), { ssr: false });


export default function CreateANewBlog() {


  return (

    <>
      <CreateANewBlo />
    </>


  )
}
