import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useBlog } from "../hooks/useBlogs";
import Avatar from "../components/Avatar";

export function Blog(){
    const { id } = useParams()
    const {loading,blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return <div>
            loading...
        </div>
    }
    return (
        <div>
            <AppBar/>
            <div className="px-40 pt-20 grid grid-cols-12 w-full">
                <div className="col-span-8">
                    <div className="font-extrabold text-4xl">
                        {blog?.title}
                    </div>
                    <div className="text-slate-500 pt-2 ">
                        {"Posted On " + blog?.createdOn.slice(0,10)}
                    </div>
                    <div className="pt-4">
                        {blog?.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        Author
                    </div>
                    <div className="flex flex-cols pt1">
                        <div className="flex items-center">
                        <Avatar name={blog?.author.name || "Anonymus"}/>
                        </div>
                        <div className="pl-4">
                            <div className="text-2xl font-bold pb-2">
                                {blog?.author.name.toUpperCase() || "Anonymus"}
                            </div>
                            <div className="text-slate-500">
                                some random info about author
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}