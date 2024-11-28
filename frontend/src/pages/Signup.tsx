import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function Signup(){
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 ">
            <Auth type={"signup"}/>
            <div className="invisible xl:visible">
                <Quote/>
            </div>
        </div>
    )
}