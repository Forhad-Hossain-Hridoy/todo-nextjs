"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Notelist() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const lsData = localStorage.getItem("noteList");
    setNotes(JSON.parse(lsData));
    console.log("notelist");
  }, []);

  const handleDeletNote = (noteId) => {
    console.log("click");
    const note = notes.filter((note) => note.id !== noteId);
    setNotes(note);
    localStorage.setItem("noteList", JSON.stringify(note));
  };


  return (
    <main className="todo_list_container max-w-[1000px] mx-auto border border-gray-300 rounded-xl p-3 mt-[20px] max-h-[600px] overflow-y-scroll ">
      <ul>
        {notes?.length >0 ? notes?.map((item) => (
          <li
            key={item.id}
            className="flex my-2 justify-between items-center bg-[#EDF6E5] p-2 rounded gap-3"
          >
            <Link href={`/${item.id}`} className="w-full">
              <p>{item?.data?.title}</p>
            </Link>
            <MdDelete
              onClick={() => {
                handleDeletNote(item.id);
              }}
              size={25}
              className=" bg-gray-300 p-1 w-[35px] h-[32px] rounded-full cursor-pointer"
              id={item.id}
            />
          </li>
        )) : <p className="text-center font-semibold">No Todo Available</p>}
      </ul>
    </main>
  );
}
