import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

type BlogCardProps = {
    authorName: string,
    content: string,
    createdOn: string,
    title: string,
    id: string
}

export default function BlogCard({
    authorName,
    content,
    createdOn,
    title,
    id
} : BlogCardProps){
    const nav = useNavigate()
    return(
        <div className="border-b pt-2 my-2 border-slate-200 pb-2 cursor-pointer" onClick={(()=>{
            nav('/blog/' + id)
        })}>
            <div className="flex items-center flex-cols pb-1">
                <Avatar name={authorName}/>
                <div className="pl-2">
                    {authorName}
                </div>
                <div className="mx-2 h-1 w-1 rounded-full bg-slate-500">
                </div>
                <div className="text font-light">
                    {createdOn.slice(0,10)}
                </div>
            </div>
            <div className="text-xl font-bold">
                {title}
            </div>
            <div className="font-light pb-2">
                {content.slice(0,100) + "..."}
            </div>
            <div className="font-extralight">
                {Math.ceil(content.length/100) + " minute read"}
            </div>
        </div>
    )
}