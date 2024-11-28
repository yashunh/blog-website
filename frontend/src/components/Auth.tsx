import { SignupInput } from "@yashunh/blog-common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type inputType = {
    placeholder: string,
    label: string,
    type: string,
    onChange: (e: any) => void
}

function InputBox({ placeholder, onChange, label, type }: inputType) {
    return (
        <div className="pb-3">
            <div className="font-medium py-1">
                {label}
            </div>
            <input placeholder={placeholder} onChange={onChange} type={type} 
                className="border border-slate-300 focus:outline-none focus:border-sky-500  rounded-lg w-96 p-3 placeholder:text-slate-500">
            </input>
        </div>
    )
}

export function Auth({ type }: { type: "signup" | "signin" }) {
    const [inputs, setInputs] = useState<SignupInput>({
        name: "",
        password: "",
        email: ""
    })
    const nav = useNavigate();
    return (
        <div className="flex justify-center flex-col h-screen items-center">
            <div className=" items-center">
                <div>
                    <div className="flex justify-center">
                        <div className="text-4xl font-extrabold pb-2">
                            {type === "signin" ? "Log In" : "Create Account"}
                        </div>
                    </div>
                    <div className="pb-3">
                        {type === "signin" ? <div className="flex justify-center text-slate-500">
                            <div>Don't have a account? </div>
                            <Link to={"/signup"} className="pl-1 underline">Create</Link>
                        </div> : <div className="flex justify-center text-slate-500">
                            <div>Already have an account? </div>
                            <Link to={"/signin"} className="pl-1 underline">Login</Link>
                        </div>
                        }
                    </div>
                    <div className="flex justify-center flex-col w-full">
                        {type==="signup" ? <InputBox label={"Username"} placeholder={"Enter your Username"} type={"text"} onChange={(e) => {
                            setInputs({
                                ...inputs,
                                name: e.target.value
                            })
                        }} /> : <div/>}
                        <InputBox label={"Email"} placeholder={"abc@email.com"} type={"text"} onChange={(e) => {
                            setInputs({
                                ...inputs,
                                email: e.target.value
                            })
                        }} />
                        <InputBox label={"Password"} placeholder={"xyz#1234"} type={"Password"} onChange={(e) => {
                            setInputs({
                                ...inputs,
                                password: e.target.value
                            })
                        }} />
                    </div>
                    <button className="bg-neutral-800 border rounded-lg w-96 mt-3 p-3 text-white font-medium" onClick={async()=>{
                        let resposne
                        if(type==="signup"){
                             resposne = await axios.post("https://backend.priyanshuntak.workers.dev/api/v1/user/signup",{
                                email: inputs.email,
                                password: inputs.password,
                                name: inputs.name
                            },{
                                withCredentials: true
                            })
                        }else{
                             resposne = await axios.post("https://backend.priyanshuntak.workers.dev/api/v1/user/signin",{
                                email: inputs.email,
                                password: inputs.password,
                            },{
                                withCredentials: true
                            })
                        }
                        if(resposne){
                            const { token } = await resposne.data
                            localStorage.setItem("token","Bearer "+ token)
                            nav('/home')
                        }
                        else{
                            alert("login failed")
                        }
                        
                    }}>
                        {type==="signin" ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    )
}