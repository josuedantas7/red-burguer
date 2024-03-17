import { ReactNode } from "react";

export default async function LayoutAuth({children} : { children : ReactNode }){
    return (
        <div className="bg-[#12131B] h-screen text-white">
            {children}
        </div>
    )
}