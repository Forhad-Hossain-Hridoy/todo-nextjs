"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TodoFrom() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const router = useRouter();

  
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [noteList , setNoteList] = useState(JSON.parse(localStorage.getItem('noteList')) || []);

  useEffect(()=>{
    const storedTodos = localStorage.getItem('noteList');
    if(storedTodos){
      setNoteList(JSON.parse(storedTodos));
    }
  },[]);
  
  useEffect(()=>{
    localStorage.setItem('noteList',JSON.stringify(noteList));
  },[noteList]);

  const handleTitleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  
  //updating note
  useEffect(()=>{
    if(noteId){
      const foundNote = noteList.find((note) => note.id === Number(noteId));
      
      setData({
        title:foundNote?.data.title ,
        description : foundNote?.data.description
      })
    }
    
  },[]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(noteId){
      //update existing  note
      const updateNote = noteList.map((note)=>
      note.id === Number(noteId) ? {...note,data } : note)
      setNoteList(updateNote);
      router.push("/")
    }else{
      //add new note
      setNoteList([...noteList,{data,id:Date.now()}]);
      
    }

    //reset form 
    setData({
      title : "",
      description : ""
    })
  };


  return (
    <div className="h-screen w-full bg-[#A5C9CA] max-w-[1000px] mx-auto p-10">
      <h1 className="text-center text-3xl underline ">{noteId ? "Update Todo" : "Add Todo"}</h1>
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col gap-5 rounded-xl p-5 h-[500px] mt-[20px]"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            value={data.title}
            onChange={handleTitleChange}
            type="text"
            id="title"
            required
            className="rounded h-[33px]
          pl-[10px] focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            value={data.description}
            onChange={handleDescriptionChange}
            id="description"
            className="resize-none h-[300px] rounded p-[10px] focus:outline-none "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 h-[33px] rounded text-[17px] font-semibold"
        >
         {noteId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
