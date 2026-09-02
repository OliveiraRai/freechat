import { TopBar } from "../components/TopBar"
import { TextInput } from "./Input"

export function ChatBody(){
    return (
        <div className="bg-primary h-screen overflow-hidden">
            <TopBar/>
            <div className="flex justify-center">
                <div className="w-1/2 h-[calc(100vh-40px)] flex flex-col justify-between">
                    <div className="h-full flex flex-col justify-end">
                        <div className="">

                        </div>
                    </div>
                    <div className="flex justify-between py-2 gap-2 px-2">
                        <TextInput placeholder={"Type your message"}/>
                        <button 
                            className="w-10 rounded-full focus:outline-none bg-tertiary cursor-pointer text-slate-200/80"
                            >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}