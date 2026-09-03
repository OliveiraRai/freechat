import { useState, useEffect } from "react"
import { TopBar } from "../components/TopBar"
import { TextInput } from "./Input"
import { useNavigate } from "react-router-dom"

export function ChatBody(){
    navigate = useNavigate();
    const[chatId, setChatId] = useState(null);
    const[chatCode, setChatCode] = useState(null);
    const[userId, setUserId] = useState(null);
    const[userName, setUserName] = useState('');
    const[connected, setConnected] = useState(False)

    useEffect(() => {
        chat_id = sessionStorage.getItem('chat_id');
        chat_code = sessionStorage.getItem('chat_code');
        user_id = sessionStorage.getItem('user_id');
        if(chat_id && chat_code && user_id){
            setChatId = chat_id;
            setChatCode = chat_code;
            setUserId = user_id;
        } else {
            console.log("Error: chat and user data missing");
            Navigate("/");
        }
        async function getName() {
            try{
                const response = await fetch(`api/user/${userId}`);
                const data = response.json();
                setUserName = data.name;
            }catch(err){
                console.log("Error while trying to get user name: ", err);
            }
        }
    })



    const handleChatDelete = () => {
        // TODO
    }

    return (
        <div className="bg-primary h-screen overflow-hidden">
            <TopBar
                connected={}
                userName={userName}
                onDelete={handleChatDelete}
            />
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