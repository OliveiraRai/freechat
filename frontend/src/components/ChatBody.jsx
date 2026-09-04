import { useState, useEffect } from "react"
import { TopBar } from "../components/TopBar"
import { TextInput } from "./Input"
import { useNavigate } from "react-router-dom"

export function ChatBody(){
    const navigate = useNavigate();
    const[chatId, setChatId] = useState(null);
    const[chatCode, setChatCode] = useState(null);
    const[userId, setUserId] = useState(null);
    const[userName, setUserName] = useState('');
    const[connected, setConnected] = useState(false);
    const[message, setMessage] = useState('');

    useEffect(() => {
        const chat_id = sessionStorage.getItem('chat_id');
        const chat_code = sessionStorage.getItem('chat_code');
        const user_id = sessionStorage.getItem('user_id');
        if(chat_id && chat_code && user_id){
            setChatId(chat_id)
            setChatCode(chat_code)
            setUserId(user_id)
            getName(userId)
        } else {
            console.log("Error: chat and user data missing");
            navigate("/");
        }
        async function getName({currentUserId}) {
            try{
                const response = await fetch(`api/user/${currentUserId}`);
                const data = await response.json();
                setUserName = data.name;
            }catch(err){
                console.log("Error while trying to get user name: ", err);
            }
        }
    }, [navigate])

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleChatDelete = async () => {
        try {
            const response = await fetch(`/api/chat/${chatId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.ok){
                console.log("Chat successfully deleted.")
            }
        }catch(err){
            console.log("Error while deleting chat: ", err)
        }
    };

    const handleMessage = () => {
        console.log(message);
        setMessage('');
    };

    return (
        <div className="bg-primary h-screen overflow-hidden">
            <TopBar
                connected={connected}
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
                        <TextInput 
                            placeholder={"Type your message"}
                            func={handleChange}
                            value={message}
                            />
                        <button 
                            className="w-10 rounded-full focus:outline-none bg-tertiary cursor-pointer text-slate-200/80"
                            onClick={handleMessage}
                            >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}