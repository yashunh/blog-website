import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "./BlogCard";

export function Blogs() {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <div>
                loading...
            </div>
        );
    }
    return (
        <div className="mx-10 md:mx-32 lg:mx-72 ">
            {blogs.map(newblog => (
                <BlogCard
                    key={newblog.id}
                    id={newblog.id}
                    authorName={newblog.author?.name || "Anonymus"}
                    content={newblog.content}
                    title={newblog.title}
                    createdOn={newblog.createdOn}
                />
            ))}

        </div>
    );
}
