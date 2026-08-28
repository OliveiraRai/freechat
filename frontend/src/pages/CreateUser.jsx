import { useState } from "react"
import { Button } from "../components/Button"
import { TextInput } from "../components/Input"

export function CreateUser(){
    const[nickname, setNickname] = useState("")

    const handleChange = (e) => {
        setNickname(e.target.value)
    }

    async function handleCreateUser() {
        try {
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': nickname
                })
            })
            const user = await response.json()
            sessionStorage.setItem('user_id', user.id)
            window.location.href = '/create'
        } catch(err) {
            console.log("Error: ", err)
        }

    }
    return (
        <>
            <TextInput 
                placeholder={"Choose a nickname"}
                value={nickname}
                func={handleChange}
                />
            <Button 
                text={"Avançar"}
                onClick={handleCreateUser}
                />
        </>
    )
}