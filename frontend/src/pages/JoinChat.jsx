import { Button } from "../components/Button"
import { TextInput } from "../components/Input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function JoinChat(){
    const navigate = useNavigate()
    const[chatCode, setChatCode] = useState("")

    const handleChange = (e) => {
        setChatCode(e.target.value)
    }

    const handleJoinChat = async () => {
        try {
            const response = await fetch(`/api/chat/chat-check/${chatCode}`)
            if(!response.ok) throw new Error("Error communicating with server.")
            const data = await response.json()
            if(data.exists && !data.guest_id){
                navigate(`/chat/${chatCode}`)
            } else {
                console.log("Invalid chat or chat already full.")
            }
        } catch(err) {
            console.log("Error: ", err)
        }
    }

    return (
        <>
            <TextInput 
                placeholder={"Enter room code"}
                value={chatCode}
                func={handleChange}
                />
            <Button 
                text={"Join"}
                onClick={handleJoinChat}
                />
        </>
    )
}