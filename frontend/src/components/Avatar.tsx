export default function Avatar({ name }:{name: string}){
    return(
        <div>
            <div className="bg-slate-500 p-2 w-10 h-10 flex text-center justify-center rounded-full text-md">
                {name ? name.toUpperCase()[0] : "A"}
            </div>
        </div>
    )
}