import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateBlog(){
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const nav = useNavigate()
    return(
        <div>
            <AppBar/>
            <div className="flex justify-center">
            <div className="mt-10 p-4 max-w-screen border rounded-md border-slate-100 shadow-md">
                <input className="outline-none fond-extrabold text-5xl h-20 w-full" placeholder="Title" onChange={(e)=>{
                    setTitle(e.target.value)
                }}>
                </input>
                <input className="outline-none w-full h-10 text-lg text-slate-600" placeholder="Content of the blog" onChange={(e)=>{
                    setContent(e.target.value)
                }}>
                </input>
            </div>
            
            </div>
            <div className="flex justify-center">
            <button className="text-lg rounded-full px-6 py-2 mt-4 bg-blue-300 text-slate-800" onClick={async()=>{
                const res = await axios.post(`https://backend.priyanshuntak.workers.dev/api/v1/blog`,{
                    title: title,
                    content: content
                },{
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                nav('/blog/'+res.data.id)
            }}>
                Create
            </button>
            </div>
        </div>
    )
}