"use client";

import { MdOutlineEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "../not-found";

export default function DetailPage({ params }) {
  const { id } = params;
  const [note, setNote] = useState();
  const noteId = note?.id ;


  useEffect(() => {
    const lsData = localStorage.getItem("noteList");
    if (lsData) {
      try {
        const notesArray = JSON.parse(lsData);
        const foundNote = notesArray.find((note) => note.id === Number(id));
        setNote(foundNote || null);
      } catch (err) {
        console.log(err.message);
      }
    }
  }, []);

  if(!note) return <NotFound />

  return (
    <div className="w-full h-screen max-w-[1000px] mx-auto bg-[#A5C9CA] p-[10px] ">
      <div className="border border-gray-300 p-[10px]">
        <h3 className="mb-[5px] font-semibold">{note?.data.title}</h3>
        <div>{note?.data.description}</div>
        <div className="flex justify-end py-1 ">
          <Link href={`/form?id=${noteId}`}  className="flex items-center border rounded text-[14px] gap-2 px-2 border-gray-200">
            <MdOutlineEdit size={15} />
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}
