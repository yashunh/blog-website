import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function AppBar() {
    const nav = useNavigate()
    return (
        <div>
            <div className="flex justify-between m-5">
                <div className="font-semibold text-lg pt-2 cursor-pointer" onClick={(()=>{
                    nav('/home')
                })}>
                    MeBlogs
                </div>
                <div className="flex">
                    <button className="bg-green-500 text-slate-800 rounded-full py-2 px-4 mr-4" onClick={()=>{
                        nav('/create')
                    }}>
                        New Blog
                    </button>
                <Avatar name="Priyanshu" />
                </div>
                
            </div>
            <div className="w-screen border-b-2 border-slate-100">

            </div>
        </div>

    )
}