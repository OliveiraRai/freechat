import { Button } from "../components/Button"
import { TextInput } from "../components/Input"

export function JoinChat(){
    return (
        <>
            <TextInput placeholder={"Enter room code"}/>
            <Button text={"Join"}/>
        </>
    )
}