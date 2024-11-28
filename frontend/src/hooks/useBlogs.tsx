import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Blog{
    "content": string,
    "title": string,
    "id": string,
    "createdOn": string,
    "author":{
        "name": string
    }
}

export const useBlog = ({ id } : { id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const nav = useNavigate()
    useEffect(() => {
        axios.get(`https://backend.priyanshuntak.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(response => {
            setBlog(response.data.response); 
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            alert('Error')
            setLoading(false);
            nav('/home')
        });
    }, [id]);

    return {
        loading,
        blog,
    };
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const nav = useNavigate()

    useEffect(() => {
        axios.get(`https://backend.priyanshuntak.workers.dev/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(response => {
            setBlogs(response.data.response); // Access the "response" field
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
            setLoading(false);
            nav('/signin')
        });
    }, []);

    return {
        loading,
        blogs,
    };
};
